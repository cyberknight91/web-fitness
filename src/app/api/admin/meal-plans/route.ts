import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, meals, clientIds } = body;

    const mealPlan = await prisma.mealPlan.create({
      data: {
        name,
        description: description || null,
        meals: {
          create: meals.map((meal: { name: string; ingredients: string; calories: number; protein: number; carbs: number; fat: number; order: number }) => ({
            name: meal.name,
            ingredients: meal.ingredients,
            calories: meal.calories || null,
            protein: meal.protein || null,
            carbs: meal.carbs || null,
            fat: meal.fat || null,
            order: meal.order,
          })),
        },
      },
    });

    if (clientIds && clientIds.length > 0) {
      await prisma.assignedMealPlan.createMany({
        data: clientIds.map((userId: string) => ({
          userId,
          mealPlanId: mealPlan.id,
          startDate: new Date(),
          active: true,
        })),
      });
    }

    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  }
}

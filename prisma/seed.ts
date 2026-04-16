import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.workoutLog.deleteMany();
  await prisma.progressLog.deleteMany();
  await prisma.assignedMealPlan.deleteMany();
  await prisma.assignedRoutine.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.routineDayExercise.deleteMany();
  await prisma.routineDay.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.successStory.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  const hashedAdmin = await bcrypt.hash("Admin123!", 12);
  const hashedClient = await bcrypt.hash("Client123!", 12);

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@ugiarosfit.com",
      password: hashedAdmin,
      name: "Coach Alex Rivera",
      role: "ADMIN",
      phone: "+1 555-123-4567",
    },
  });

  // Clients
  const client1 = await prisma.user.create({
    data: {
      email: "maria@example.com",
      password: hashedClient,
      name: "Maria Santos",
      role: "CLIENT",
      phone: "+1 555-111-2222",
      age: 28,
      height: 165,
      weight: 72,
      goal: "lose weight",
    },
  });

  const client2 = await prisma.user.create({
    data: {
      email: "james@example.com",
      password: hashedClient,
      name: "James Mitchell",
      role: "CLIENT",
      phone: "+1 555-333-4444",
      age: 32,
      height: 180,
      weight: 78,
      goal: "gain muscle",
    },
  });

  const client3 = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      password: hashedClient,
      name: "Sarah Johnson",
      role: "CLIENT",
      age: 25,
      height: 170,
      weight: 65,
      goal: "body recomposition",
    },
  });

  // Exercises
  const exercises = await Promise.all([
    prisma.exercise.create({ data: { name: "Barbell Bench Press", muscleGroup: "Chest", description: "Flat bench press with barbell" } }),
    prisma.exercise.create({ data: { name: "Incline Dumbbell Press", muscleGroup: "Chest", description: "Incline bench press with dumbbells at 30-45 degrees" } }),
    prisma.exercise.create({ data: { name: "Cable Flyes", muscleGroup: "Chest", description: "Standing cable crossover flyes" } }),
    prisma.exercise.create({ data: { name: "Barbell Row", muscleGroup: "Back", description: "Bent-over barbell row" } }),
    prisma.exercise.create({ data: { name: "Lat Pulldown", muscleGroup: "Back", description: "Wide grip lat pulldown" } }),
    prisma.exercise.create({ data: { name: "Seated Cable Row", muscleGroup: "Back", description: "Seated cable row with V-bar" } }),
    prisma.exercise.create({ data: { name: "Barbell Squat", muscleGroup: "Legs", description: "Back squat with barbell" } }),
    prisma.exercise.create({ data: { name: "Romanian Deadlift", muscleGroup: "Legs", description: "Stiff-leg deadlift variation" } }),
    prisma.exercise.create({ data: { name: "Leg Press", muscleGroup: "Legs", description: "45-degree leg press machine" } }),
    prisma.exercise.create({ data: { name: "Leg Curl", muscleGroup: "Legs", description: "Lying or seated leg curl machine" } }),
    prisma.exercise.create({ data: { name: "Overhead Press", muscleGroup: "Shoulders", description: "Standing barbell overhead press" } }),
    prisma.exercise.create({ data: { name: "Lateral Raises", muscleGroup: "Shoulders", description: "Dumbbell lateral raises" } }),
    prisma.exercise.create({ data: { name: "Barbell Curl", muscleGroup: "Arms", description: "Standing barbell bicep curl" } }),
    prisma.exercise.create({ data: { name: "Tricep Pushdown", muscleGroup: "Arms", description: "Cable tricep pushdown with rope" } }),
    prisma.exercise.create({ data: { name: "Plank", muscleGroup: "Core", description: "Forearm plank hold" } }),
    prisma.exercise.create({ data: { name: "Cable Crunch", muscleGroup: "Core", description: "Kneeling cable crunch" } }),
  ]);

  // Routine 1: Hypertrophy 4-Day Split
  const routine1 = await prisma.routine.create({
    data: {
      name: "Hypertrophy 4-Day Split",
      description: "Upper/Lower split focused on muscle growth with progressive overload",
      days: {
        create: [
          {
            dayOfWeek: 0, // Monday - Upper
            exercises: {
              create: [
                { exerciseId: exercises[0].id, sets: 4, reps: "8-10", restSeconds: 90, order: 0 },
                { exerciseId: exercises[1].id, sets: 3, reps: "10-12", restSeconds: 60, order: 1 },
                { exerciseId: exercises[3].id, sets: 4, reps: "8-10", restSeconds: 90, order: 2 },
                { exerciseId: exercises[4].id, sets: 3, reps: "10-12", restSeconds: 60, order: 3 },
                { exerciseId: exercises[10].id, sets: 3, reps: "8-10", restSeconds: 60, order: 4 },
                { exerciseId: exercises[12].id, sets: 3, reps: "10-12", restSeconds: 45, order: 5 },
                { exerciseId: exercises[13].id, sets: 3, reps: "10-12", restSeconds: 45, order: 6 },
              ],
            },
          },
          {
            dayOfWeek: 1, // Tuesday - Lower
            exercises: {
              create: [
                { exerciseId: exercises[6].id, sets: 4, reps: "6-8", restSeconds: 120, order: 0 },
                { exerciseId: exercises[7].id, sets: 3, reps: "10-12", restSeconds: 90, order: 1 },
                { exerciseId: exercises[8].id, sets: 3, reps: "12-15", restSeconds: 60, order: 2 },
                { exerciseId: exercises[9].id, sets: 3, reps: "12-15", restSeconds: 60, order: 3 },
                { exerciseId: exercises[14].id, sets: 3, reps: "30-60 sec", restSeconds: 45, order: 4 },
                { exerciseId: exercises[15].id, sets: 3, reps: "15-20", restSeconds: 45, order: 5 },
              ],
            },
          },
          {
            dayOfWeek: 3, // Thursday - Upper
            exercises: {
              create: [
                { exerciseId: exercises[0].id, sets: 4, reps: "6-8", restSeconds: 120, order: 0 },
                { exerciseId: exercises[2].id, sets: 3, reps: "12-15", restSeconds: 60, order: 1 },
                { exerciseId: exercises[5].id, sets: 4, reps: "10-12", restSeconds: 60, order: 2 },
                { exerciseId: exercises[11].id, sets: 4, reps: "12-15", restSeconds: 45, order: 3 },
                { exerciseId: exercises[12].id, sets: 3, reps: "8-10", restSeconds: 45, order: 4 },
                { exerciseId: exercises[13].id, sets: 3, reps: "8-10", restSeconds: 45, order: 5 },
              ],
            },
          },
          {
            dayOfWeek: 4, // Friday - Lower
            exercises: {
              create: [
                { exerciseId: exercises[6].id, sets: 4, reps: "8-10", restSeconds: 120, order: 0 },
                { exerciseId: exercises[7].id, sets: 4, reps: "8-10", restSeconds: 90, order: 1 },
                { exerciseId: exercises[8].id, sets: 3, reps: "15-20", restSeconds: 60, order: 2 },
                { exerciseId: exercises[9].id, sets: 3, reps: "10-12", restSeconds: 60, order: 3 },
                { exerciseId: exercises[15].id, sets: 3, reps: "15-20", restSeconds: 45, order: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  // Routine 2: Full Body Beginner
  const routine2 = await prisma.routine.create({
    data: {
      name: "Full Body Beginner",
      description: "3-day full body program for beginners focusing on compound movements",
      days: {
        create: [
          {
            dayOfWeek: 0, // Monday
            exercises: {
              create: [
                { exerciseId: exercises[6].id, sets: 3, reps: "10", restSeconds: 90, notes: "Focus on form", order: 0 },
                { exerciseId: exercises[0].id, sets: 3, reps: "10", restSeconds: 60, order: 1 },
                { exerciseId: exercises[4].id, sets: 3, reps: "10", restSeconds: 60, order: 2 },
                { exerciseId: exercises[10].id, sets: 3, reps: "10", restSeconds: 60, order: 3 },
                { exerciseId: exercises[14].id, sets: 3, reps: "30 sec", restSeconds: 30, order: 4 },
              ],
            },
          },
          {
            dayOfWeek: 2, // Wednesday
            exercises: {
              create: [
                { exerciseId: exercises[7].id, sets: 3, reps: "10", restSeconds: 90, order: 0 },
                { exerciseId: exercises[1].id, sets: 3, reps: "10", restSeconds: 60, order: 1 },
                { exerciseId: exercises[3].id, sets: 3, reps: "10", restSeconds: 60, order: 2 },
                { exerciseId: exercises[11].id, sets: 3, reps: "12", restSeconds: 45, order: 3 },
                { exerciseId: exercises[15].id, sets: 3, reps: "15", restSeconds: 30, order: 4 },
              ],
            },
          },
          {
            dayOfWeek: 4, // Friday
            exercises: {
              create: [
                { exerciseId: exercises[8].id, sets: 3, reps: "12", restSeconds: 60, order: 0 },
                { exerciseId: exercises[0].id, sets: 3, reps: "8", restSeconds: 60, order: 1 },
                { exerciseId: exercises[5].id, sets: 3, reps: "10", restSeconds: 60, order: 2 },
                { exerciseId: exercises[12].id, sets: 2, reps: "12", restSeconds: 45, order: 3 },
                { exerciseId: exercises[13].id, sets: 2, reps: "12", restSeconds: 45, order: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  // Meal Plan 1: Muscle Gain 2800kcal
  const mealPlan1 = await prisma.mealPlan.create({
    data: {
      name: "Muscle Gain 2800kcal",
      description: "High protein meal plan for muscle building",
      meals: {
        create: [
          { name: "Breakfast", ingredients: "4 whole eggs, 2 slices whole wheat toast, 1 banana, 1 cup oatmeal with honey", calories: 650, protein: 35, carbs: 75, fat: 22, order: 0 },
          { name: "Mid-Morning Snack", ingredients: "Greek yogurt (200g), mixed nuts (30g), 1 apple", calories: 350, protein: 20, carbs: 35, fat: 14, order: 1 },
          { name: "Lunch", ingredients: "200g grilled chicken breast, 200g brown rice, steamed broccoli and carrots, olive oil drizzle", calories: 650, protein: 50, carbs: 70, fat: 15, order: 2 },
          { name: "Pre-Workout Snack", ingredients: "Protein shake with banana, 2 tbsp peanut butter, oat milk", calories: 400, protein: 30, carbs: 40, fat: 12, order: 3 },
          { name: "Dinner", ingredients: "200g salmon fillet, sweet potato (200g), mixed green salad with avocado", calories: 600, protein: 40, carbs: 50, fat: 22, order: 4 },
          { name: "Evening Snack", ingredients: "Cottage cheese (150g), handful of almonds, 1 tbsp honey", calories: 250, protein: 20, carbs: 15, fat: 12, order: 5 },
        ],
      },
    },
  });

  // Meal Plan 2: Fat Loss 1800kcal
  const mealPlan2 = await prisma.mealPlan.create({
    data: {
      name: "Fat Loss 1800kcal",
      description: "Caloric deficit plan with high protein to preserve muscle",
      meals: {
        create: [
          { name: "Breakfast", ingredients: "3 egg whites + 1 whole egg scramble, 1 slice whole wheat toast, spinach, tomatoes", calories: 300, protein: 25, carbs: 20, fat: 10, order: 0 },
          { name: "Mid-Morning Snack", ingredients: "Protein bar or shake (low sugar), 1 small apple", calories: 250, protein: 25, carbs: 20, fat: 6, order: 1 },
          { name: "Lunch", ingredients: "150g grilled chicken breast, large mixed salad with cucumber, bell peppers, olive oil and lemon dressing, 100g quinoa", calories: 450, protein: 40, carbs: 35, fat: 12, order: 2 },
          { name: "Afternoon Snack", ingredients: "Greek yogurt (150g) with berries", calories: 150, protein: 15, carbs: 15, fat: 3, order: 3 },
          { name: "Dinner", ingredients: "150g white fish (tilapia or cod), roasted vegetables (zucchini, broccoli, cauliflower), small side salad", calories: 400, protein: 35, carbs: 25, fat: 12, order: 4 },
          { name: "Evening", ingredients: "Casein protein mixed with water, 5 almonds", calories: 180, protein: 25, carbs: 5, fat: 6, order: 5 },
        ],
      },
    },
  });

  // Assign routines and meal plans
  await prisma.assignedRoutine.createMany({
    data: [
      { userId: client1.id, routineId: routine2.id, startDate: new Date("2026-03-01"), active: true },
      { userId: client2.id, routineId: routine1.id, startDate: new Date("2026-03-01"), active: true },
      { userId: client3.id, routineId: routine1.id, startDate: new Date("2026-03-15"), active: true },
    ],
  });

  await prisma.assignedMealPlan.createMany({
    data: [
      { userId: client1.id, mealPlanId: mealPlan2.id, startDate: new Date("2026-03-01"), active: true },
      { userId: client2.id, mealPlanId: mealPlan1.id, startDate: new Date("2026-03-01"), active: true },
      { userId: client3.id, mealPlanId: mealPlan1.id, startDate: new Date("2026-03-15"), active: true },
    ],
  });

  // Progress logs for client1 (weight loss goal - trending down)
  const progressDates1 = [
    new Date("2026-03-01"), new Date("2026-03-08"), new Date("2026-03-15"),
    new Date("2026-03-22"), new Date("2026-03-29"),
  ];
  await prisma.progressLog.createMany({
    data: progressDates1.map((date, i) => ({
      userId: client1.id,
      weight: 72 - i * 0.6,
      waist: 82 - i * 0.5,
      chest: 92 - i * 0.2,
      hips: 98 - i * 0.4,
      leftArm: 28,
      rightArm: 28.5,
      loggedAt: date,
      notes: i === 0 ? "Starting measurements" : undefined,
    })),
  });

  // Progress logs for client2 (muscle gain - weight trending up)
  const progressDates2 = [
    new Date("2026-03-01"), new Date("2026-03-08"), new Date("2026-03-15"),
    new Date("2026-03-22"), new Date("2026-03-29"),
  ];
  await prisma.progressLog.createMany({
    data: progressDates2.map((date, i) => ({
      userId: client2.id,
      weight: 78 + i * 0.3,
      chest: 100 + i * 0.3,
      waist: 84,
      leftArm: 33 + i * 0.2,
      rightArm: 33.5 + i * 0.2,
      loggedAt: date,
    })),
  });

  // Progress logs for client3
  await prisma.progressLog.createMany({
    data: [
      { userId: client3.id, weight: 65, waist: 72, chest: 86, loggedAt: new Date("2026-03-15") },
      { userId: client3.id, weight: 64.5, waist: 71.5, chest: 86.5, loggedAt: new Date("2026-03-22") },
      { userId: client3.id, weight: 64.2, waist: 71, chest: 87, loggedAt: new Date("2026-03-29") },
      { userId: client3.id, weight: 64, waist: 70.5, chest: 87, loggedAt: new Date("2026-04-05") },
      { userId: client3.id, weight: 63.8, waist: 70, chest: 87.5, loggedAt: new Date("2026-04-09") },
    ],
  });

  // Success Stories
  await prisma.successStory.createMany({
    data: [
      {
        clientName: "David Chen",
        testimonial: "I lost 20kg in 8 months with Coach Alex. The personalized nutrition plan was the game-changer. I never felt like I was on a diet, and the workouts kept me motivated every single week.",
        weightBefore: 105,
        weightAfter: 85,
        duration: "8 months",
        featured: true,
      },
      {
        clientName: "Emma Rodriguez",
        testimonial: "After years of yo-yo dieting, UgiarosFit helped me build a sustainable routine. I've gained confidence, strength, and a body I'm proud of. The coaching support was incredible.",
        weightBefore: 75,
        weightAfter: 62,
        duration: "6 months",
        featured: true,
      },
      {
        clientName: "Marcus Thompson",
        testimonial: "I went from never lifting weights to competing in my first powerlifting meet. Coach Alex designed a program that fit my schedule perfectly and pushed me beyond what I thought was possible.",
        weightBefore: 70,
        weightAfter: 82,
        duration: "12 months",
        featured: false,
      },
    ],
  });

  // Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: "5 Essential Tips for Building Muscle Naturally",
        slug: "5-tips-building-muscle-naturally",
        content: `Building muscle is a journey that requires consistency, proper nutrition, and smart training. Here are five essential tips to maximize your muscle-building potential naturally.

1. Progressive Overload is Key
The foundation of muscle growth is progressively increasing the demands on your muscles. This means gradually increasing weight, reps, or sets over time. Track your workouts and aim to improve each week.

2. Prioritize Protein Intake
Aim for 1.6-2.2g of protein per kg of body weight daily. Spread your protein intake across 4-5 meals throughout the day for optimal muscle protein synthesis. Quality sources include chicken, fish, eggs, dairy, and legumes.

3. Don't Skip Recovery
Muscles grow during rest, not during training. Ensure you get 7-9 hours of quality sleep each night and take rest days seriously. Overtraining can actually hinder your progress.

4. Master Compound Movements
Exercises like squats, deadlifts, bench press, and rows should form the foundation of your program. These movements recruit multiple muscle groups and stimulate the most growth.

5. Stay Consistent
Results take time. Don't expect overnight transformations. Stay consistent with your training and nutrition for at least 12 weeks before evaluating your progress. The most successful transformations come from years of dedicated work.`,
        published: true,
        publishedAt: new Date("2026-03-15"),
      },
      {
        title: "The Complete Guide to Meal Prepping for Fitness",
        slug: "complete-guide-meal-prepping-fitness",
        content: `Meal prepping is one of the most powerful tools in your fitness arsenal. It saves time, reduces decision fatigue, and keeps you on track with your nutrition goals.

Why Meal Prep?
When healthy meals are ready to go, you eliminate the temptation of fast food and poor choices. You control your portions, macros, and ingredients.

Getting Started
Choose one day per week (Sunday works for most people) to prepare your meals. Start simple with 3-4 recipes and scale up as you get comfortable.

Essential Equipment
You'll need quality food containers, a good set of measuring cups and a food scale, and basic cooking equipment like sheet pans and a rice cooker.

Sample Prep Day
Morning: Cook proteins (chicken, ground turkey, salmon)
Midday: Prepare carb sources (rice, sweet potatoes, quinoa)
Afternoon: Chop vegetables and assemble meals

Storage Tips
Most prepped meals last 4-5 days in the fridge. For longer storage, freeze individual portions and thaw overnight when needed.

Start simple, stay consistent, and watch your nutrition compliance skyrocket.`,
        published: true,
        publishedAt: new Date("2026-04-01"),
      },
    ],
  });

  // Sample messages
  await prisma.message.createMany({
    data: [
      {
        fromUserId: client1.id,
        toUserId: admin.id,
        content: "Hi Coach! I just finished my first week. Feeling great but a bit sore after leg day!",
        createdAt: new Date("2026-03-03"),
        read: true,
      },
      {
        fromUserId: admin.id,
        toUserId: client1.id,
        content: "That's totally normal, Maria! The soreness will decrease as your body adapts. Make sure you're stretching after workouts and getting enough sleep. Great job completing the first week!",
        createdAt: new Date("2026-03-03"),
        read: true,
      },
      {
        fromUserId: client2.id,
        toUserId: admin.id,
        content: "Hey Coach, I managed to increase my bench press to 80kg today! Personal record!",
        createdAt: new Date("2026-03-20"),
        read: true,
      },
      {
        fromUserId: admin.id,
        toUserId: client2.id,
        content: "That's amazing James! 80kg is a solid bench. We'll keep pushing next week. How are the macros going?",
        createdAt: new Date("2026-03-20"),
        read: true,
      },
    ],
  });

  console.log("Seed completed successfully!");
  console.log("\nLogin credentials:");
  console.log("  Admin: admin@ugiarosfit.com / Admin123!");
  console.log("  Client 1: maria@example.com / Client123!");
  console.log("  Client 2: james@example.com / Client123!");
  console.log("  Client 3: sarah@example.com / Client123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

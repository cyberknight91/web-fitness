"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type MealPlanData = {
  id: string;
  name: string;
  description: string | null;
  meals: {
    id: string;
    name: string;
    ingredients: string;
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    order: number;
  }[];
};

export function MealPlanView({ mealPlan }: { mealPlan: MealPlanData }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const totals = mealPlan.meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const eatenCalories = mealPlan.meals
    .filter((m) => checked.has(m.id))
    .reduce((acc, m) => acc + (m.calories || 0), 0);

  const caloriePct = totals.calories > 0 ? Math.round((eatenCalories / totals.calories) * 100) : 0;

  function toggleMeal(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mt-4">
      {/* Totales Diarios */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-semibold">Totales Diarios</h3>
            <span className="text-sm text-muted-foreground">{eatenCalories} / {totals.calories} kcal</span>
          </div>
          <Progress value={caloriePct} className="h-2 mb-4" />
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totals.calories}</p>
              <p className="text-xs text-muted-foreground">Calorias</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{totals.protein}g</p>
              <p className="text-xs text-muted-foreground">Proteina</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-500">{totals.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbohidratos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{totals.fat}g</p>
              <p className="text-xs text-muted-foreground">Grasas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comidas */}
      <div className="space-y-3">
        {mealPlan.meals.map((meal) => {
          const isChecked = checked.has(meal.id);
          return (
            <Card key={meal.id} className={isChecked ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleMeal(meal.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${isChecked ? "line-through" : ""}`}>
                        {meal.name}
                      </h4>
                      {meal.calories && (
                        <Badge variant="secondary">{meal.calories} kcal</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{meal.ingredients}</p>
                    <div className="mt-2 flex gap-3 text-xs">
                      {meal.protein && <span className="text-blue-500">P: {meal.protein}g</span>}
                      {meal.carbs && <span className="text-amber-500">C: {meal.carbs}g</span>}
                      {meal.fat && <span className="text-red-500">G: {meal.fat}g</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

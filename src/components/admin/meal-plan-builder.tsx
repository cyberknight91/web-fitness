"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Client = { id: string; name: string; email: string };

type MealEntry = {
  name: string;
  ingredients: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export function MealPlanBuilder({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [meals, setMeals] = useState<MealEntry[]>([
    { name: "Breakfast", ingredients: "", calories: 0, protein: 0, carbs: 0, fat: 0 },
  ]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + (m.calories || 0),
      protein: acc.protein + (m.protein || 0),
      carbs: acc.carbs + (m.carbs || 0),
      fat: acc.fat + (m.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  function addMeal() {
    setMeals([...meals, { name: "", ingredients: "", calories: 0, protein: 0, carbs: 0, fat: 0 }]);
  }

  function updateMeal(index: number, updates: Partial<MealEntry>) {
    setMeals(meals.map((m, i) => (i === index ? { ...m, ...updates } : m)));
  }

  function removeMeal(index: number) {
    setMeals(meals.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!name.trim()) {
      toast.error("Please enter a plan name");
      return;
    }
    if (meals.length === 0) {
      toast.error("Please add at least one meal");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/meal-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          meals: meals.map((m, i) => ({ ...m, order: i })),
          clientIds: selectedClients,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Meal plan created!");
      router.push("/admin/meal-plans");
    } catch {
      toast.error("Failed to create meal plan");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nombre del Plan *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Muscle Gain 2800kcal" />
          </div>
          <div>
            <Label>Descripcion</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Daily Totals Preview */}
      <Card>
        <CardContent className="p-4">
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

      {/* Meals */}
      {meals.map((meal, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-base">Meal {i + 1}</CardTitle>
            {meals.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeMeal(i)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Nombre</Label>
              <Input
                value={meal.name}
                onChange={(e) => updateMeal(i, { name: e.target.value })}
                placeholder="e.g., Breakfast, Pre-Workout Snack"
              />
            </div>
            <div>
              <Label>Ingredientes / Descripcion</Label>
              <Textarea
                value={meal.ingredients}
                onChange={(e) => updateMeal(i, { ingredients: e.target.value })}
                placeholder="200g chicken breast, 150g brown rice, mixed vegetables..."
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <Label className="text-xs">Calorias</Label>
                <Input type="number" value={meal.calories || ""} onChange={(e) => updateMeal(i, { calories: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <Label className="text-xs">Proteina (g)</Label>
                <Input type="number" value={meal.protein || ""} onChange={(e) => updateMeal(i, { protein: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label className="text-xs">Carbohidratos (g)</Label>
                <Input type="number" value={meal.carbs || ""} onChange={(e) => updateMeal(i, { carbs: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label className="text-xs">Grasas (g)</Label>
                <Input type="number" value={meal.fat || ""} onChange={(e) => updateMeal(i, { fat: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addMeal} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Agregar Comida
      </Button>

      {/* Assign to Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Asignar a Clientes (opcional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {clients.map((client) => (
              <label key={client.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
                <Checkbox
                  checked={selectedClients.includes(client.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedClients([...selectedClients, client.id]);
                    } else {
                      setSelectedClients(selectedClients.filter((id) => id !== client.id));
                    }
                  }}
                />
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} disabled={submitting} className="w-full" size="lg">
        {submitting ? "Creando..." : "Crear Plan"}
      </Button>
    </div>
  );
}

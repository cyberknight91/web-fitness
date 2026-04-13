"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

type Story = {
  id: string;
  clientName: string;
  testimonial: string;
  photoBefore: string | null;
  photoAfter: string | null;
  weightBefore: number | null;
  weightAfter: number | null;
  duration: string | null;
  featured: boolean;
};

export default function StoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    testimonial: "",
    photoBefore: "",
    photoAfter: "",
    weightBefore: "",
    weightAfter: "",
    duration: "",
    featured: false,
  });

  useEffect(() => {
    fetch("/api/admin/stories/list")
      .then((r) => r.json())
      .then(setStories);
  }, []);

  async function handleCreate() {
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const story = await res.json();
      setStories([story, ...stories]);
      setOpen(false);
      setForm({ clientName: "", testimonial: "", photoBefore: "", photoAfter: "", weightBefore: "", weightAfter: "", duration: "", featured: false });
      toast.success("Story created!");
    } catch {
      toast.error("Failed to create story");
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/admin/stories?id=${id}`, { method: "DELETE" });
      setStories(stories.filter((s) => s.id !== id));
      toast.success("Story deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Historias de Exito</h1>
          <p className="mt-1 text-muted-foreground">{stories.length} historias</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Agregar Historia</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nueva Historia de Exito</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nombre del Cliente *</Label>
                <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
              </div>
              <div>
                <Label>Testimonio *</Label>
                <Textarea value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Peso Antes (kg)</Label>
                  <Input value={form.weightBefore} onChange={(e) => setForm({ ...form, weightBefore: e.target.value })} />
                </div>
                <div>
                  <Label>Peso Despues (kg)</Label>
                  <Input value={form.weightAfter} onChange={(e) => setForm({ ...form, weightAfter: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Duracion</Label>
                <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 6 months" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>URL Foto Antes</Label>
                  <Input value={form.photoBefore} onChange={(e) => setForm({ ...form, photoBefore: e.target.value })} />
                </div>
                <div>
                  <Label>URL Foto Despues</Label>
                  <Input value={form.photoAfter} onChange={(e) => setForm({ ...form, photoAfter: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label>Destacada</Label>
              </div>
              <Button onClick={handleCreate} className="w-full">Crear Historia</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{story.clientName}</h3>
                <div className="flex items-center gap-1">
                  {story.featured && <Star className="h-4 w-4 fill-primary text-primary" />}
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(story.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {story.weightBefore && story.weightAfter && (
                <p className="text-sm text-muted-foreground mt-1">
                  {story.weightBefore}kg → {story.weightAfter}kg
                </p>
              )}
              {story.duration && (
                <Badge variant="secondary" className="mt-1 text-xs">{story.duration}</Badge>
              )}
              <p className="mt-2 text-sm italic line-clamp-3">&ldquo;{story.testimonial}&rdquo;</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

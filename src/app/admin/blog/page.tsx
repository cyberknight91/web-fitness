"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImage: "",
    published: false,
  });

  useEffect(() => {
    fetch("/api/admin/blog/list")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  async function handleCreate() {
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const post = await res.json();
      setPosts([post, ...posts]);
      setOpen(false);
      setForm({ title: "", content: "", coverImage: "", published: false });
      toast.success("Post created!");
    } catch {
      toast.error("Failed to create post");
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function togglePublish(post: BlogPost) {
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, published: !post.published }),
      });
      if (!res.ok) throw new Error();
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
      toast.success(post.published ? "Unpublished" : "Published");
    } catch {
      toast.error("Failed to update");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Publicaciones del Blog</h1>
          <p className="mt-1 text-muted-foreground">{posts.length} publicaciones</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nueva Publicacion</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nueva Publicacion del Blog</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Titulo *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>URL Imagen de Portada</Label>
                <Input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
              </div>
              <div>
                <Label>Contenido (Markdown) *</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="font-mono text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                <Label>Publicar inmediatamente</Label>
              </div>
              <Button onClick={handleCreate} className="w-full">Crear Publicacion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Publicado" : "Borrador"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => togglePublish(post)}>
                  {post.published ? "Despublicar" : "Publicar"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

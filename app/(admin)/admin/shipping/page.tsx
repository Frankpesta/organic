"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Truck, 
  DollarSign,
  Clock,
  Globe
} from "lucide-react";
import { toast } from "sonner";

export default function AdminShippingPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countryCode: "ALL",
    price: 0,
    freeShippingThreshold: 0,
    estimatedDays: "",
    isActive: true,
    sortOrder: 0,
  });

  const shippingMethods = useQuery(api.shipping.getShippingMethods);
  const createMethod = useMutation(api.shipping.createShippingMethod);
  const updateMethod = useMutation(api.shipping.updateShippingMethod);
  const deleteMethod = useMutation(api.shipping.deleteShippingMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMethod) {
        await updateMethod({
          id: editingMethod._id,
          ...formData,
        });
        toast.success("Shipping method updated successfully!");
      } else {
        await createMethod(formData);
        toast.success("Shipping method created successfully!");
      }
      
      setIsCreateOpen(false);
      setEditingMethod(null);
      resetForm();
    } catch (error) {
      toast.error("Failed to save shipping method");
    }
  };

  const handleEdit = (method: any) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      description: method.description || "",
      countryCode: method.countryCode,
      price: method.price,
      freeShippingThreshold: method.freeShippingThreshold || 0,
      estimatedDays: method.estimatedDays,
      isActive: method.isActive,
      sortOrder: method.sortOrder,
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this shipping method?")) {
      try {
        await deleteMethod({ id: id as any });
        toast.success("Shipping method deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete shipping method");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      countryCode: "ALL",
      price: 0,
      freeShippingThreshold: 0,
      estimatedDays: "",
      isActive: true,
      sortOrder: 0,
    });
  };

  const countries = [
    { code: "ALL", name: "International (All Countries)" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "NG", name: "Nigeria" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "CN", name: "China" },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shipping Methods</h1>
          <p className="text-muted-foreground">
            Manage shipping options and pricing for different countries
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingMethod(null);
              resetForm();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shipping Method
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMethod ? "Edit Shipping Method" : "Add New Shipping Method"}
              </DialogTitle>
              <DialogDescription>
                Configure shipping options and pricing for your store
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Method Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Standard Shipping"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="countryCode">Country</Label>
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this shipping method..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeThreshold"
                    type="number"
                    step="0.01"
                    value={formData.freeShippingThreshold}
                    onChange={(e) => setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDays">Estimated Days</Label>
                  <Input
                    id="estimatedDays"
                    value={formData.estimatedDays}
                    onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
                    placeholder="e.g., 3-5 business days"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMethod ? "Update" : "Create"} Method
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {shippingMethods?.map((method) => (
          <Card key={method._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <CardDescription>
                      {method.countryCode === "ALL" ? "International" : countries.find(c => c.code === method.countryCode)?.name}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={method.isActive ? "default" : "secondary"}>
                    {method.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(method)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(method._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-sm text-muted-foreground">
                      ${method.price.toFixed(2)}
                      {method.freeShippingThreshold > 0 && (
                        <span className="text-green-600 ml-1">
                          (Free over ${method.freeShippingThreshold})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Delivery Time</p>
                    <p className="text-sm text-muted-foreground">{method.estimatedDays}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Coverage</p>
                    <p className="text-sm text-muted-foreground">
                      {method.countryCode === "ALL" ? "Worldwide" : "Specific Country"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Sort Order</p>
                  <p className="text-sm text-muted-foreground">{method.sortOrder}</p>
                </div>
              </div>
              {method.description && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {shippingMethods?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Truck className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No shipping methods</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by adding your first shipping method
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shipping Method
            </Button>
          </CardContent>
        </Card>
      )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { createPost } from "@/action/action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  shirtSize: z.string().min(1, "Shirt size is required"),
  nameOnShirt: z.string().max(11, "Maximum 11 characters allowed").optional(),
  contactNumber: z
    .string()
    .regex(/^\d{3}-\d{3,4}\s\d{3,4}$/, "Format: 010-1234 567"),
  paymentMethod: z.enum(["bank", "tng", "other"]),
  paymentSlip: z.instanceof(File).optional().nullable(),
});

const shirtSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "7XL",
];

export default function RegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      shirtSize: "",
      nameOnShirt: "",
      contactNumber: "",
      paymentMethod: "bank",
      paymentSlip: null,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize the router

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Convert the payment slip file to a FormData if it exists
    const formData = new FormData();
    formData.append("full_name", values.fullName);
    formData.append("shirt_size", values.shirtSize);
    formData.append("name_on_shirt", values.nameOnShirt || "");
    formData.append("contact_number", values.contactNumber);
    formData.append("payment_method", values.paymentMethod);

    if (values.paymentSlip) {
      formData.append("payment_slip", values.paymentSlip);
    }

    // Call the server-side API function to create the post
    try {
      const post = await createPost(formData);
      console.log("Post created:", post);
      setTimeout(() => {
        if (router) {
          router.push("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="bg-gray-200 py-12">
      <div className="w-full max-w-4xl mx-auto border border-white rounded-lg shadow-lg bg-gray-50">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">
            3RD TZY ACS INTRA-TOURNAMENT
          </h2>
        </div>
        <div className="px-6 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (as per IC)*</FormLabel>
                    <FormControl>
                      <Input placeholder="TAN ZI LI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shirtSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shirt Size*</FormLabel>
                    <div className="my-2">
                      <img
                        src="/images/shirtsize.png" // Assuming the image is based on the selected shirt size
                        alt="Shirt Size"
                        className="" // Adjust size and centering as needed
                      />
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your shirt size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shirtSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameOnShirt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Shirt</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Maximum 11 characters"
                        maxLength={11}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave blank if you don&apos;t want a name on your shirt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number*</FormLabel>
                    <FormControl>
                      <Input placeholder="010-1234 567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Label>Payment Slip*</Label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      form.setValue("paymentSlip", file);
                    }
                  }}
                />
                <FormDescription>
                  Bank in to: 185-50-03-616-2 (TAN ZI LI - HLB)
                  <br />
                  Please remark your name and IC in the payment slip
                </FormDescription>
              </div>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method*</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="bank" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Bank Transfer
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="tng" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Touch n Go
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full ${
                  isSubmitting ? "bg-gray-400" : "bg-black"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>For other payment methods, kindly contact:</p>
            <p>TAN ZI LI (010-983 3810)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

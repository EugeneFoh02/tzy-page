"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ref, push } from "firebase/database";
import { realtimeDb } from "@/lib/firebase"; // Adjust path as needed

const formSchema = z
  .object({
    category: z.string({
      required_error: "Please select a category",
    }),
    academy: z.string().min(1, "Academy/Institution name is required"),
    player1Name: z.string().min(1, "Player 1 name is required"),
    player1IC: z.string().min(1, "Player 1 IC number is required"),
    player1Contact: z.string().min(1, "Player 1 contact number is required"),
    player1EmergencyContactPerson: z.string({
      required_error: "Please select an emergency contact person",
    }),
    player1EmergencyContact: z
      .string()
      .min(1, "Emergency contact number is required"),
    player1ShirtSize: z.string({
      required_error: "Please select a shirt size",
    }),

    // Player 2 Fields
    player2Name: z.string().optional(),
    player2IC: z.string().optional(),
    player2Contact: z.string().optional(),
    player2EmergencyContactPerson: z.string().optional(),
    player2EmergencyContact: z.string().optional(),
    player2ShirtSize: z.string().optional(),

    paymentProof: z.instanceof(FileList).optional(),
  })
  .refine(
    (data) => {
      if (data.category.includes("DOUBLE")) {
        return (
          data.player2Name &&
          data.player2IC &&
          data.player2Contact &&
          data.player2EmergencyContact &&
          data.player2ShirtSize &&
          data.player2EmergencyContactPerson
        );
      }
      return true;
    },
    {
      message: "All Player 2 fields are required for DOUBLE categories.",
      path: ["player2Name"], // You can change this to a custom field or leave as-is
    }
  );


export default function RegistrationForm() {
  const [isDoubleCategory, setIsDoubleCategory] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academy: "",
      player1Name: "",
      player1IC: "",
      player1Contact: "",
      player1EmergencyContact: "",
      player2Name: "",
      player2IC: "",
      player2Contact: "",
      player2EmergencyContact: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const registrationsRef = ref(realtimeDb, "registrations");
      push(registrationsRef, {
        ...values,
        timestamp: new Date().toISOString(),
      });

      alert("Registration submitted successfully!");
      form.reset(); // Optional: reset form after submit
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Failed to submit registration. Please try again.");
    }
  }

  const handleCategoryChange = (value: string) => {
    setIsDoubleCategory(value.includes("DOUBLE"));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Card className="border-t-4 border-t-blue-600">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Categories Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                CATEGORIES *
              </h2>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SINGLE UNDER 10" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            SINGLE UNDER 10
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SINGLE UNDER 12" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            SINGLE UNDER 12
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SINGLE UNDER 14" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            SINGLE UNDER 14
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SINGLE UNDER 16" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            SINGLE UNDER 16
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SINGLE UNDER 18" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            SINGLE UNDER 18
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="DOUBLE UNDER 16" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            DOUBLE UNDER 16
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="DOUBLE UNDER 22" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            DOUBLE UNDER 22
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Academy/Institution Section */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="academy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">
                      ACADEMY / INSTITUTION NAME
                    </FormLabel>
                    <FormDescription>EG. XXX BADMINTON ACADEMY</FormDescription>
                    <FormControl>
                      <Input placeholder="Enter academy name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Player 1 Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">PLAYER 1</h2>

              <FormField
                control={form.control}
                name="player1Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAME AS PER IC (TAN ZI LI) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter player name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player1IC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IC NUMBER (941122-08-3357) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter IC number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player1Contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CONTACT NUMBER (010 - 1234 567) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player1EmergencyContactPerson"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>EMERGENCY CONTACT PERSON (紧急联系人)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="GUARDIAN" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            GUARDIAN (监护人)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="COACH" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            COACH (教练)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="OTHER" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player1EmergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      EMERGENCY CONTACT NUMBER (紧急联系号码)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter emergency contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player1ShirtSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SHIRT SIZE *</FormLabel>
                    <div className="mb-2">
                      <img
                        src="/images/shirtsize.png"
                        alt="Size chart"
                        className="border rounded-md"
                      />
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a shirt size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="4XS">4XS</SelectItem>
                        <SelectItem value="3XS">3XS</SelectItem>
                        <SelectItem value="2XS">2XS</SelectItem>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="2XL">2XL</SelectItem>
                        <SelectItem value="3XL">3XL</SelectItem>
                        <SelectItem value="5XL">5XL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isDoubleCategory && (
              <>
                <Separator />

                {/* Player 2 Section (Only for Double Categories) */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    PLAYER 2 (ONLY FOR DOUBLE PLAYER)
                  </h2>

                  <FormField
                    control={form.control}
                    name="player2Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NAME AS PER IC (GOH SUEKI)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter player name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="player2IC"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IC NUMBER (961208-08-3212)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter IC number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="player2Contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CONTACT NUMBER (010 - 1234 567)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter contact number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="player2ShirtSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SHIRT SIZE</FormLabel>
                        <div className="mb-2">
                          <img
                            src="/images/shirtsize.png"
                            alt="Size chart"
                            className="border rounded-md"
                          />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a shirt size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="4XS">4XS</SelectItem>
                            <SelectItem value="3XS">3XS</SelectItem>
                            <SelectItem value="2XS">2XS</SelectItem>
                            <SelectItem value="XS">XS</SelectItem>
                            <SelectItem value="S">S</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="XL">XL</SelectItem>
                            <SelectItem value="2XL">2XL</SelectItem>
                            <SelectItem value="3XL">3XL</SelectItem>
                            <SelectItem value="5XL">5XL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="player2EmergencyContactPerson"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          EMERGENCY CONTACT PERSON (紧急联系人)
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="GUARDIAN" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                GUARDIAN (监护人)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="COACH" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                COACH (教练)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="OTHER" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="player2EmergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          EMERGENCY CONTACT NUMBER (紧急联系号码)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter emergency contact number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <Separator />

            {/* Payment Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                PAYMENT DETAILS *
              </h2>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">
                  Payment Instructions
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  PAYMENT BANK IN TO
                  <br />
                  185-50-03-616-2
                  <br />
                  HONG LEONG BANK
                  <br />
                  TAN ZI LI
                  <br />
                  <br />
                  OR
                  <br />
                  <br />
                  TOUCH N GO PAYMENT
                  <br />
                  TAN ZI LI (010 - 983 3810)
                  <br />
                  <br />
                  PLS REMARK UR NAME AND IC IN THE PAYMENT SLIP
                </AlertDescription>
              </Alert>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="payment-proof">Upload Payment Proof *</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="payment-proof"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Upload 1 supported file. Max 10 MB.
                </p>
                {file && (
                  <p className="text-sm text-green-600">
                    File selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-center text-gray-600">
                WE ARE SEEKING FOR SPONSORSHIP
                <br />
                ANYONE WHO WANNA ADVERTISE OR PROMOTE
                <br />
                KINDLY CONTACT
                <br />
                TAN ZI LI (010 - 983 3810)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit Registration
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters").max(100, "First Name too long"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters").max(100, "Last Name too long"),
  email: z.string().email("Invalid email").max(200, "Email too long"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject too long"),
  message: z.string().min(5, "Message must be at least 5 characters").max(5000, "Message too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to send");

      setServerMessage("✅ Message sent successfully!");
      reset();
    } catch (e: any) {
      setServerMessage(`❌ ${e.message || "Something went wrong"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <Input
                id="firstName"
                {...register("firstName")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400"
                placeholder="John"
            />
            {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <Input
                id="lastName"
                {...register("lastName")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400"
                placeholder="Doe"
            />
            {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>}
        </div>
    </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400"
                placeholder="john@example.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <Input
                id="subject"
                {...register("subject")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400"
                placeholder="Project Discussion"
            />
            {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>}
        </div>

        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <Textarea
                id="message"
                {...register("message")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400"
                placeholder="Tell me about your project or just say hello..."
            />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
        </div>

        <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transition-all duration-300 transform hover:scale-105"
        >
            {
                isSubmitting ? 
                    <>
                        <Mail className="mr-2" size={20} />
                        Sending Message...
                    </> : 
                    <>
                        <Mail className="mr-2" size={20} />
                        Send Message
                    </>
            }
        </Button>

        {serverMessage && (
            <p className={`text-sm ${serverMessage.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {serverMessage}
            </p>
        )}
    </form>
  );
}

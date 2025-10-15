"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.email({ error: "Insira um e-mail válido." }),
  password: z
    .string({ error: "Insira uma senha." })
    .nonempty("O campo é obrigatório."),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log("data:", data);

    // TODO: Backend URL via .env
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!response.ok) {
      // TODO: Display error
      return;
    }

    const token = await response.json();
    // TODO: Put token in future requests

    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="self-center text-lg font-semibold pb-5">
        Gerenciador de Despesas
      </h1>

      <div className="flex flex-col bg-white p-5 border rounded-xl w-sm">
        <h1 className="self-center text-lg font-semibold pb-5">Login</h1>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="email@email.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <Button type="submit">Entrar</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

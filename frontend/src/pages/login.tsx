import { Input } from "@/components/ui/input";
import "../app/globals.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="self-center text-lg font-semibold pb-5">
        Gerenciador de Despesas
      </h1>

      <div className="flex flex-col bg-white p-5 border rounded-xl">
        <h1 className="self-center text-lg font-semibold pb-5">Login</h1>

        <form className="flex flex-col space-y-3">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" placeholder="email@email.com" />

          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="secret" placeholder="******" />

          <Button className="w-min self-end">Entrar</Button>
        </form>
      </div>
    </div>
  );
}

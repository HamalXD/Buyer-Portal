import { useState } from "react";
import { useLoginMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      setErrors(messages.join(", "));
      return;
    }
    setErrors(null);

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          token: res.token,
          user: { name: res.name, email: res.email || "" },
        }),
      );
      navigate("/dashboard");
    } catch (err: any) {
      setErrors(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {errors && <p className="text-red-500">{errors}</p>}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-sm text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Create new
          </Link>
        </p>
      </form>
    </div>
  );
};

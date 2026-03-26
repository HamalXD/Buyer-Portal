import { useState } from "react";
import { apiSlice, useRegisterMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      setErrors(messages.join(", "));
      return;
    }
    setErrors(null);

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));

      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (err: any) {
      setErrors(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        {errors && <p className="text-red-500">{errors}</p>}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="p-2 border rounded"
        />
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
          className="bg-green-500 text-white p-2 rounded"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

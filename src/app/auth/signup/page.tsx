"use client";

import React, { useState } from "react";
import { useSupabase } from "@/context/SupabaseAuthProvider";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const SignUpPage: React.FC = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("📢 [page.tsx:21]", error);
    if (error) {
      setError(error.message);
    } else {
      if (data?.user) {
        await supabase
          .from("user_roles")
          .insert({ user_id: data.user.id, role_id: 1 }); // Default to 'user' role
      }
      router.push("/jobs/home");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create your account
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome! Please fill in the details to get started.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? Or Sign In with Google or LinkedIn{" "}
          <Button href="/auth/signin" color="primary">
            Sign in
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpPage;

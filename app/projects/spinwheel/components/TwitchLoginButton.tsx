// components/TwitchLoginButton.tsx
"use client";

export default function TwitchLoginButton() {
  const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI!;
  const scopes = ["user:read:follows"].join("+"); // add more scopes if needed

  const handleLogin = () => {
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}&force_verify=true`;
    window.location.href = url;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
    >
      Login with Twitch
    </button>
  );
}

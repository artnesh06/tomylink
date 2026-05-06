"use client";
// User public bio link page - e.g. yourlink.com/anesh

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 430 }}>
        {/* This will be the full bio link page */}
        <p style={{ color: "#fff", padding: 20 }}>@{params.username} page coming soon</p>
      </div>
    </div>
  );
}

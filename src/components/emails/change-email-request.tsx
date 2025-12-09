interface ChangeEmailRequestProps {
  url: string;
  currentEmail: string;
  newEmail: string;
}

export function ChangeEmailRequest({
  url,
  currentEmail,
  newEmail,
}: ChangeEmailRequestProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "36px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e9ecef",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              color: "#0f172a",
              fontSize: "24px",
              marginBottom: "12px",
            }}
          >
            Confirmez votre changement d'adresse email
          </h1>
          <p
            style={{
              color: "#1e293b",
              fontSize: "16px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Vous avez demandé à remplacer votre adresse {""}
            <strong>{currentEmail}</strong> par {""}
            <strong>{newEmail}</strong>. Cliquez sur le bouton ci-dessous pour
            confirmer ce changement.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <a
            href={url}
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Confirmer le changement
          </a>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              fontSize: "18px",
              marginBottom: "12px",
            }}
          >
            Informations importantes
          </h2>
          <ul
            style={{
              color: "#334155",
              fontSize: "15px",
              lineHeight: 1.6,
              paddingLeft: "20px",
              margin: 0,
            }}
          >
            <li>Ce lien est personnel et expirera dans 1 heure.</li>
            <li>
              Si vous n'êtes pas à l'origine de cette demande, ignorez cet email
              et contactez l'équipe EKA.
            </li>
            <li>
              Le changement sera effectif uniquement après validation de ce
              lien.
            </li>
          </ul>
        </div>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Merci de votre confiance. L'équipe RESONANCE.
        </p>
      </div>
    </div>
  );
}

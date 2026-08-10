"use client";

import { useState, type FormEvent } from "react";

import { RevealText } from "@/components/motion/reveal-text";

const EMAIL = "liamatkins24@gmail.com";

const fields = [
  { name: "name", label: "Your name*", type: "text", required: true },
  { name: "email", label: "Your email*", type: "email", required: true },
  { name: "company", label: "Your company", type: "text", required: false },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend yet, so the form hands off to the visitor's mail client. Swap
  // this for a POST to a route handler when there is somewhere to send it.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Company: ${get("company") || "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Project enquiry from ${get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <p className="contact__eyebrow">Lets start a conversation</p>

      <RevealText as="h2" text="Lorem ipsum" className="contact__title" />

      <p className="contact__divider">Starts with</p>

      <RevealText
        as="p"
        text="Lorem ipsum dilor"
        className="contact__title contact__title--wide"
      />

      <form className="contact__form" onSubmit={onSubmit}>
        <div className="contact__fields">
          {fields.map((field) => (
            <p key={field.name} className="contact__field">
              <label htmlFor={`contact-${field.name}`}>{field.label}</label>
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={field.name === "name" ? "name" : field.name}
              />
            </p>
          ))}

          <p className="contact__field">
            <label htmlFor="contact-message">Your message*</label>
            <textarea id="contact-message" name="message" required rows={3} />
          </p>
        </div>

        <button type="submit" className="contact__submit">
          Lets go
        </button>

        <span role="status" className="contact__status">
          {sent ? "Opening your mail app…" : ""}
        </span>
      </form>
    </section>
  );
}
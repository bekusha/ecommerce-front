// pages/contact.js
import React from "react";
import axios from "axios";

interface ContactData {
  title: string;
  content: string;
  email: string;
  phone: string;
}

interface ContactProps {
  data: ContactData;
}

const Contact = ({ data }: ContactProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-xl mb-4">{data.content}</p>
      <div className="text-lg">
        <p>
          Email:{" "}
          <a href={`mailto:${data.email}`} className="text-blue-500">
            {data.email}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href={`tel:${data.phone}`} className="text-blue-500">
            {data.phone}
          </a>
        </p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}content/contact/`
    );
    return { props: { data: res.data } };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    // Return empty props or default values as a fallback
    return {
      props: { data: { title: "Error", content: "", email: "", phone: "" } },
    };
  }
}

export default Contact;

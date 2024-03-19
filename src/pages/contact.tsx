// pages/contact.js
import React from "react";
import axios from "axios";

const Contact = ({ data }: any) => {
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
  // Use Axios to fetch the content from the API
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}content/contact/`
  );
  const data = res.data;

  return { props: { data } };
}

export default Contact;

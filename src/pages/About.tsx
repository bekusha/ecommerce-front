// pages/about.js
import React from "react";
import axios from "axios";

const About = ({ data }: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-xl">{data.content}</p>
    </div>
  );
};

export async function getStaticProps() {
  // Use Axios to fetch the content from the API
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}content/about/`
  );
  const data = res.data;

  // Pass the data to the About page via props
  return { props: { data } };
}

export default About;

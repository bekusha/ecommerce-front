// pages/about.js
import React from "react";
import axios from "axios";

interface AboutData {
  title: string;
  content: string;
}

// Define an interface for the component props
interface AboutProps {
  data: AboutData;
}

const About = ({ data }: AboutProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-xl">{data.content}</p>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}content/about/`
    );
    return { props: { data: res.data } };
  } catch (error) {
    console.error("Error fetching about data:", error);
    // Consider a more sophisticated error handling strategy here
    return {
      props: {
        data: { title: "Error", content: "Could not load the content." },
      },
    };
  }
}
export default About;

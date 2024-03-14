import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
// import {useAppBridge} from "@shopify/app-bridge-react";


const Spyfu = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [SeoClickdata, setSeoClickdataData] = useState("Loading");
  const [AdsBudgedata, setAdsBudgedata] = useState("Loading");  
  const [averageOrganicRank, setaverageOrganicRank] = useState("Loading");
  const [pageSpeed, setPageSpeed] = useState("Loading..")
  const [url, seturl]= useState("https://www.shopify.com")

    
// function DemoPage() {
//   const bridge = useAppBridge();
//   let host = ((new URL(document.location)).searchParams).get("shop");
//   console.log(shopUrl);
// }
  // const apiKey = 'SZEUZKDC'; // Replace with your actual API key
  const host = `https://www.${(new URL(document.location)).searchParams.get("shop") || window.__SHOPIFY_DEV_HOST}`;
  

  const fetchDataPerformance = async () => {
    console.log("host", host)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${host}`
      );
      console.log("response", response.data.lighthouseResult.categories);
      const data = await response.data;
      console.log("Gp Data", data.loadingExperience.overall_category)
      setPageSpeed(data.loadingExperience.overall_category)
      const performnace = data.lighthouseResult.categories.performance.score * 100;
      console.log("performnace", performnace);
      setData(performnace);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchDataFromSpyFu = async () => {
    const postData = {
      website: host, // Replace with the actual website you want SpyFu data for
    };
  
    try {
      const response = await fetch(
        "https://us-central1-causalfunnel-21.cloudfunctions.net/CF_getSpyfu_Data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const n=data.results.length


      console.log("Spyfu", data.results[n-1].averageOrganicRank)
      setSeoClickdataData(data.results[n-1].monthlyOrganicClicks)
      setAdsBudgedata(data.results[n-1].monthlyBudget)
      setaverageOrganicRank(data.results[n-1].averageOrganicRank)
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null; // Or handle the error as needed
    }
  };

  useEffect(() => {
    // DemoPage()
    fetchDataPerformance();
    fetchDataFromSpyFu();
  }, []);

  return (
    <div>
      <div className="m-4 flex justify-center flex-col">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Plugin Ecommerce
          </span>
        </h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Elevate your website’s performance to new heights with our AI-driven
          solution. Experience faster load times, optimized content delivery,
          and unparalleled user satisfaction.
        </p>
      </div>

      <div class="flex justify-center" style={{ height: "175px" }}>
        <ReactSpeedometer
          maxValue={100}
          minValue={0}
          value={data}
          needleColor="steelblue"
          needleTransitionDuration={4000}
          needleTransition="easeElastic"
          needleHeightRatio={0.7}
        />
      </div>
      <div>
        {/* Your existing JSX code */}
        {loading ? (
          <div className="text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Loading your Performance...
          </div>
        ) : (
          <div className="flex justify-center m-10">
            <h1 className="font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Performance
              </span>
            </h1>
          </div>
        )}
        {/* Your remaining JSX code */}
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Monthly SEO Clicks</h3>
              <p className="text-3xl">{SeoClickdata}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">OverAll catogary</h3>
              <p className="text-2xl">{pageSpeed}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Ads Expenditure</h3>
              <p className="text-3xl">{AdsBudgedata}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Average Organic rank</h3>
              <p className="text-3xl">{averageOrganicRank}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center m-10">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Boost Your Performance
        </button>
      </div>
    </div>
  );
};

export default Spyfu;

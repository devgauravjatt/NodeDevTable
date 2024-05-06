import React, { useEffect } from "react";

export default function App() {
  const [img, setImg] = React.useState(0);
  const [opacity, setOpacity] = React.useState(1);
  const imgs = [
    "https://i.ibb.co/6Rg5YrX/Capture.png",
    "https://i.ibb.co/w0Ww9r3/Captur4444e.png",
    "https://raw.githubusercontent.com/devgauravjatt/NodeDevTable/main/images/show.png",
  ];

  useEffect(() => {
    const interval = setInterval(async () => {
      setOpacity(0);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setImg((img + 1) % imgs.length);
      setOpacity(1);
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [img, imgs.length]);

  return (
    <div className="flex  h-screen w-full flex-col">
      <ul className="flex h-12 w-full items-center justify-around bg-zinc-600 py-2">
        <li className=" rounded-md bg-slate-900 px-2 py-1 text-white hover:shadow-sm hover:shadow-orange-100">
          <a
            className="flex items-center gap-2"
            href="https://github.com/devgauravjatt/NodeDevTable"
            target="_blank"
          >
            <span className="pi pi-github"></span>
            Github
          </a>
        </li>
        <li className=" rounded-md bg-slate-900 px-2 py-1 text-white hover:shadow-sm hover:shadow-orange-100">
          <a
            className="flex items-center gap-2"
            href="https://github.com/devgauravjatt/NodeDevTable"
            target="_blank"
          >
            <span className="pi pi-star"></span>
            Give Star
          </a>
        </li>
      </ul>
      <div className="flex w-full flex-col items-center justify-center pt-16">
        <h2 className="text-center text-2xl font-semibold text-slate-800">
          NodeDevTable is a node developers dependency markdown table generator
        </h2>
        <p className="px-40 pt-8 text-center text-slate-500">
          NodeDevTable is a versatile tool that simplifies the creation of
          dependency tables both as a CLI tool and a VS Code extension. It
          enhances project readability and ensures proper documentation.
        </p>
        <div
          style={{ opacity: opacity, backgroundImage: imgs[img] }}
          className="imgcss mt-8 flex h-96 w-[500px] justify-center rounded-lg border-2 border-gray-700"
        ></div>
      </div>
      <div className="mt-14 flex justify-center gap-8">
        <a
          className="flex justify-center gap-1 rounded-md bg-[#5582bf] p-8 text-2xl text-white"
          href="https://marketplace.visualstudio.com/items?itemName=DevGauravJatt.nodedevtable"
          target="_blank"
        >
          <div className="flex w-12 items-center justify-center rounded-lg bg-white">
            <img
              src="https://i.imgur.com/oeLffh8.png"
              alt="forvscode"
              className="w-10 object-cover"
            />
          </div>
          Get For VsCode
        </a>
        <a
          className="flex justify-center gap-1 rounded-md bg-[#5582bf] p-8 text-2xl text-white"
          href="https://www.npmjs.com/package/nodedevtable"
          target="_blank"
        >
          <div className="flex w-12 items-center justify-center rounded-lg bg-white">
            <img
              src="https://i.imgur.com/n7iwS93.png"
              alt="forvscode"
              className="w-10 object-cover"
            />
          </div>
          Get For Node Cli
        </a>
      </div>
    </div>
  );
}

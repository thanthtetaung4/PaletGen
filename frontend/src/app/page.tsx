"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useState } from "react";

// Define the custom type for the object structure
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  neutralLight: string;
  neutralDark: string;
  highlight: string;
  displayColors(): void;
};

// Create a class that represents the object
class ColorPalette implements ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutralLight: string;
  neutralDark: string;
  highlight: string;

  constructor(
    primary: string,
    secondary: string,
    accent: string,
    neutralLight: string,
    neutralDark: string,
    highlight: string
  ) {
    this.primary = primary;
    this.secondary = secondary;
    this.accent = accent;
    this.neutralLight = neutralLight;
    this.neutralDark = neutralDark;
    this.highlight = highlight;
  }

  // Example method to display colors
  displayColors(): void {
    console.log("Primary:", this.primary);
    console.log("Secondary:", this.secondary);
    console.log("Accent:", this.accent);
    console.log("Neutral Light:", this.neutralLight);
    console.log("Neutral Dark:", this.neutralDark);
    console.log("Highlight:", this.highlight);
  }
}

export function InputDemo() {
  return <Input type="email" placeholder="Email" />;
}

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [result, setResult] = useState<ThemeColors | null>(null);
  const [paletteName, setPaletteName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!prompt && !img) {
      alert("Please provide a prompt or upload an image.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    if (img) formData.append("image", img); // Attach the image file
    formData.append("prompt", prompt); // Attach the prompt

    try {
      const response = await fetch("http://127.0.0.1:5000/generate_palette", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const parsedData = JSON.parse(data);
        const {
          primary,
          secondary,
          accent,
          neutralLight,
          neutralDark,
          highlight,
        } = parsedData.colors;
        setPaletteName(parsedData.paletteName);
        console.log(parsedData);
        console.log(typeof data);
        // Update state with the result
        const palette = new ColorPalette(
          primary,
          secondary,
          accent,
          neutralLight,
          neutralDark,
          highlight
        );
        setResult(palette);
        palette.displayColors();
      } else {
        console.error("Failed to fetch color palette.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="px-4 lg:w-6/12 flex flex-col items-center mx-auto pb-10">
        <div className="flex flex-col justify-center items-center mt-5">
          <h1 className="text-xl lg:text-3xl font-bold">Welcome To PaletGen</h1>
          <div className="text-center mt-3">
            <h2 className="text-lg lg:text-xl font-semibold">How to use</h2>
            <p className="leading-7">
              Input the image for inspiration. <br />
              If you don&apos;t have you can type in the idea and get your color
              palette. <br />
              Example Prompt: &quot;Color palette based on Yellow for Primary
              School&quot;
            </p>
          </div>
        </div>
        <form className="flex flex-col justify-center gap-5 mt-5">
          <Input
            type="file"
            accept="image/png,jpg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setImg(files[0]);
              }
            }}
          />
          <Input
            id="prompt"
            type="text"
            placeholder="Color palette based on Yellow for Primary School"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrompt(e.target.value)
            }
          />

          {!isLoading ? (
            <Button onClick={submitPrompt}>Submit</Button>
          ) : (
            <Button disabled className="">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </Button>
          )}
        </form>
      </div>
      <div className={!result ? "hidden" : "block"}>
        {!isLoading && (
          <div className="flex flex-col justify-center items-center mt-5">
            <h2 className="text-lg lg:text-xl font-semibold">{paletteName}</h2>
            <div className="grid grid-rows-6 md:grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5">
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">
                  Primary Color
                </h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.primary }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.primary}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">Secondary</h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.secondary }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.secondary}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">Accent</h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.accent }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.accent}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">
                  Neutral Light
                </h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.neutralLight }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.neutralLight}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">
                  Neutral Dark
                </h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.neutralDark }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.neutralDark}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-lg lg:text-xl font-semibold">Highlight</h3>
                <div
                  className={"w-16 h-16 border"}
                  style={{ backgroundColor: result?.highlight }}
                ></div>
                <p className="text-lg lg:text-xl font-semibold">
                  {result?.highlight}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

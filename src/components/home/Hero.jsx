import { CheckCircle2, Code, Rocket, Terminal } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../utility/Button";

const Hero = () => {
  const pythonSnippet = `# Python
def greet_user(name):
    print(f"Hello, {name}! Welcome to CodeDrift.")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet_user(user_name)
`;

  const javaSnippet = `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to CodeDrift!");
        String name = "John Doe";
        greetUser(name);
    }

    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
`;

  const reactSnippet = `// React
import React from "react";

export default function App() {
    return (
        <div>
            <h1>Welcome to CodeDrift!</h1>
        </div>
    );
}
`;

  const phpSnippet = `<?php
// PHP
function greetUser($name) {
    echo "Hello, $name! Welcome to CodeDrift.";
}

greetUser("John Doe");
?>
`;

  const htmlSnippet = `<!DOCTYPE html>
<html>
  <head>
    <title>Codedrift</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1><a href="/">Header</a></h1>
    <nav>
      <a href="one/">Link1</a>
      <a href="two/">Two</a>
    </nav>
  </body>
</html>
`;

  return (
    <section className="relative h-lvh bg-gradient-to-br from-[#fdfbfb] via-[#f7f9fc] to-[#f0f4f8] text-gray-800 overflow-hidden">
      {/* Moving Lucide Icons in Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Code
          className="absolute top-5 left-3 md:left-10 text-codedrift-pink/20 animate-pulse"
          size={70}
        />
        <Code
          className="absolute md:hidden top-5 right-3 md:left-10 text-codedrift-pink/20 animate-pulse"
          size={70}
        />
        <Terminal
          className="absolute bottom-16 right-20 text-codedrift-indigo/20 animate-bounce"
          size={60}
        />
        <Rocket
          className="absolute top-1/2 left-1/2 text-codedrift-blue/20 animate-spin-slow"
          size={80}
        />
      </div>

      {/* Brand Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#ee4f7e]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-[#4cb7e5]/10 rounded-full blur-3xl"></div>

      <div className="container h-lvh">
        <div className="relative h-full z-10 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 ">
          {/* Left Content */}
          <div className="md:w-1/2 pt-4 md:pt-0">
            <h1 className="text-center md:text-start text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-codedrift-indigo">
              Code Smart. <br />
              <span className="bg-gradient-to-r from-[#ee4f7e] to-[#4cb7e5] bg-clip-text text-transparent">
                Build Bold.
              </span>
            </h1>

            <p className="text-center font-bold sm:text-start text-lg md:text-xl text-gray-600 mb-4">
              Master cutting-edge tech stacks, crack interviews, and build
              production-ready applications — all in one place.
            </p>

            <ul className="text-gray-700 text-sm md:text-base mb-4 sm:mb-8 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                Hands-on projects & real-world coding challenges
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                100+ Projects & 20+ Industry-leading technologies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-codedrift-pink" />
                Learn from expert mentors & build your portfolio
              </li>
            </ul>

            <div className="flex justify-center sm:justify-start items-center gap-4">
              <Button as="link" variant="pink" to="/courses#courses-list">
                Explore Courses
              </Button>
              <Button as="link" variant="pink" to="/auth/register">
                Join Now
              </Button>
            </div>
          </div>

          {/* Right Animated Code Snippet */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full h-[20rem] md:max-h-[65vh] md:h-[65vh] bg-white animate-[float_6s_ease-in-out_infinite]">
              <div className="h-2 bg-codedrift-gradient"></div>
              <div className="p-4 font-mono text-sm bg-[#282a36] text-white rounded-b-xl h-full">
                <pre className="overflow-x-auto overflow-y-auto h-full">
                  <Typewriter
                    words={[
                      pythonSnippet,
                      javaSnippet,
                      reactSnippet,
                      phpSnippet,
                      htmlSnippet,
                    ]}
                    loop={true}
                    typeSpeed={35}
                    deleteSpeed={10}
                    delaySpeed={2800}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

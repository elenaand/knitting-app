"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-center min-w-[150px] gap-6">
        <CardTitle>Antall</CardTitle>

        <CardContent className="text-4xl underline decoration-wavy decoration-2 decoration-pink">
          {count}
        </CardContent>
      </CardHeader>
      <CardFooter className="flex justify-between w-full">
        <Button
          size="icon-lg"
          variant="outline"
          onClick={() => setCount(count - 1)}
        >
          -
        </Button>
        <Button
          size="icon-lg"
          variant="outline"
          onClick={() => setCount(count + 1)}
        >
          +
        </Button>
      </CardFooter>
    </Card>
  );
}

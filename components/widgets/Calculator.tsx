"use client";

import { useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export default function Calculator() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-primary underline underline-offset-4 decoration-wavy decoration-pink dark:text-zinc-50">
        Garnulatorer
      </h2>
      <div className="flex gap-4 flex-wrap">
        <RatioCalculator />
        <AmountCalculator />
      </div>
    </div>
  );
}

function AmountCalculator() {
  const [originalWeight, setOriginalWeight] = useState("");
  const [originalLength, setOriginalLength] = useState("");
  const [neededWeight, setNeededWeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newLength, setNewLength] = useState("");

  const ratio = calculateYarnRatio({
    originalWeight: originalWeight,
    originalLength: originalLength,
    newWeight: newWeight,
    newLength: newLength,
  });

  const originalNumberOfBalls =
    parseFloat(neededWeight || "0") / parseFloat(originalWeight || "1");
  const originalTotalLength =
    originalNumberOfBalls * parseFloat(originalLength || "0");

  const amountNeeded = ratio * parseFloat(neededWeight || "0");
  const numberOfBalls = amountNeeded / parseFloat(newWeight || "1");
  const numberOfWholeBalls = Math.ceil(
    amountNeeded / parseFloat(newWeight || "1")
  );

  // Garnmengde - amount
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="flex flex-col items-center justify-center min-w-[180px] gap-6">
        <CardTitle>Garnmengde</CardTitle>
        <CardDescription>
          <p>
            Finn ut hvor mye garn du trenger om du ønsker å bytte ut garnet i
            oppskriften
          </p>
        </CardDescription>
        <CardAction className="flex flex-col gap-2 bg-white/80 p-2 rounded-md">
          <h4 className="text-sm font-semibold">Orginal garn</h4>

          <Label htmlFor="required-yarn-weight-amount">
            Gram i oppskriften (gram)
          </Label>
          <Input
            id="required-yarn-weight-amount"
            placeholder="gram"
            value={neededWeight}
            onChange={(e) => setNeededWeight(e.target.value)}
            type="number"
            className="w-[100px]"
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="original-yarn-weight-amount">Vekt (gram)</Label>
              <Input
                id="original-yarn-weight-amount"
                placeholder="gram"
                value={originalWeight}
                onChange={(e) => setOriginalWeight(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="original-yarn-length-amount">
                Løpelengde (meter)
              </Label>
              <Input
                id="original-yarn-length-amount"
                placeholder="meter"
                value={originalLength}
                onChange={(e) => setOriginalLength(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
          </div>

          <h4 className="text-sm font-semibold">Alternativt garn</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="new-yarn-weight-amount">Vekt (gram)</Label>
              <Input
                id="new-yarn-weight-amount"
                placeholder="gram"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="new-yarn-length-amount">Løpelengde (meter)</Label>
              <Input
                id="new-yarn-length-amount"
                placeholder="meter"
                value={newLength}
                onChange={(e) => setNewLength(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 w-full ">
        <p>
          I orginalgarnet trengte du {originalNumberOfBalls} nøster som
          tilsvarer {originalTotalLength} meter.
        </p>

        <p>
          Du trenger {ratio} * {parseFloat(neededWeight || "0")} ={" "}
          <span className="font-bold">{Math.ceil(amountNeeded)}</span>g av det
          alternative garnet.
        </p>

        <p>
          Det tilsvarer {amountNeeded.toFixed(2)}g /{" "}
          {parseFloat(neededWeight || "0")}g = {numberOfBalls.toFixed(2)} ≈{" "}
          <span className="font-bold ">{numberOfWholeBalls} hele nøster.</span>
        </p>
      </CardFooter>
    </Card>
  );
}

function RatioCalculator() {
  const [originalWeight, setOriginalWeight] = useState("");
  const [originalLength, setOriginalLength] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newLength, setNewLength] = useState("");

  const ratio = calculateYarnRatio({
    originalWeight: originalWeight,
    originalLength: originalLength,
    newWeight: newWeight,
    newLength: newLength,
  });

  // Forholdstall - ratio

  return (
    <Card className="w-full max-w-[400px] h-full">
      <CardHeader className="flex flex-col items-center justify-center min-w-[180px] gap-6">
        <CardTitle>Garnmengde</CardTitle>
        <CardDescription>
          <p>Regn ut forholdstallet mellom to garnalternativer.</p>
        </CardDescription>
        <CardAction className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Orginal garn</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="original-yarn-weight-ratio">Vekt (gram)</Label>
              <Input
                id="original-yarn-weight-ratio"
                placeholder="gram"
                value={originalWeight}
                onChange={(e) => setOriginalWeight(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="original-yarn-length-ratio">
                Løpelengde (meter)
              </Label>
              <Input
                id="original-yarn-length-ratio"
                placeholder="meter"
                value={originalLength}
                onChange={(e) => setOriginalLength(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
          </div>
          <h4 className="text-sm font-semibold">Alternativt garn</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="new-yarn-weight-ratio">Vekt (gram)</Label>
              <Input
                id="new-yarn-weight-ratio"
                placeholder="gram"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="new-yarn-length-ratio">Løpelengde (meter)</Label>
              <Input
                id="new-yarn-length-ratio"
                placeholder="meter"
                value={newLength}
                onChange={(e) => setNewLength(e.target.value)}
                type="number"
                className="w-[100px]"
              />
            </div>
          </div>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex justify-between w-full ">
        <p>
          Du trenger <span className="font-bold">{ratio.toFixed(2)}</span> så
          mange ganger av det nye garnet
        </p>
      </CardFooter>
    </Card>
  );
}

function calculateYarnRatio({
  originalWeight,
  originalLength,
  newWeight,
  newLength,
}: {
  originalWeight: string;
  originalLength: string;
  newWeight: string;
  newLength: string;
}): number {
  const originalWeightNum = parseFloat(originalWeight);
  const originalLengthNum = parseFloat(originalLength);
  const newWeightNum = parseFloat(newWeight);
  const newLengthNum = parseFloat(newLength);

  if (
    isNaN(originalWeightNum) ||
    isNaN(originalLengthNum) ||
    isNaN(newWeightNum) ||
    isNaN(newLengthNum) ||
    originalWeightNum === 0 ||
    newWeightNum === 0
  ) {
    return 0;
  }

  const originalRatio = originalLengthNum / originalWeightNum;
  const newRatio = newLengthNum / newWeightNum;

  return originalRatio / newRatio;
}

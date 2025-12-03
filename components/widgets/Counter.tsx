"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Minus, Plus, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

interface CounterContent {
  id: string;
  name: string;
  count: number;
}

export default function Counters() {
  const storedCounters =
    typeof window !== "undefined"
      ? localStorage.getItem("knittingCounters")
      : null;

  const [counters, setCounters] = useState<CounterContent[]>([]);

  useEffect(function setCountersFromLocalStorage() {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCounters(storedCounters ? JSON.parse(storedCounters) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("Antall");

  function saveCounters(updatedCounters: CounterContent[]) {
    localStorage.setItem("knittingCounters", JSON.stringify(updatedCounters));
    setCounters(updatedCounters);
  }

  function deleteCounter(id: string) {
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    saveCounters(updatedCounters);
  }

  function updateCounter(id: string, newCount: number) {
    const updatedCounters = counters.map((counter) =>
      counter.id === id ? { ...counter, count: newCount } : counter
    );
    saveCounters(updatedCounters);
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-primary underline underline-offset-4 decoration-wavy decoration-pink dark:text-zinc-50">
        Tellere
      </h2>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="default">Legg til teller</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Legg til ny teller</DialogTitle>
              <DialogDescription className="sr-only">
                Legg til ny teller
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name-1" className="text-sm font-medium">
                  Navn på teller
                </label>
                <Input
                  id="name-1"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Navn på teller"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setName("Antall")}>
                  Avbryt
                </Button>
              </DialogClose>
              <Button
                variant="default"
                onClick={() => {
                  saveCounters([
                    ...counters,
                    { id: crypto.randomUUID(), name: name, count: 0 },
                  ]);
                  setName("Antall");
                  setDialogOpen(false);
                }}
              >
                Legg til teller <Plus />
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <div className="flex gap-4 flex-wrap">
        {counters.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Ingen tellere lagt til enda.
          </p>
        )}
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            name={counter.name}
            initialCount={counter.count}
            onDelete={() => deleteCounter(counter.id)}
            updateCounter={(newCount: number) =>
              updateCounter(counter.id, newCount)
            }
          />
        ))}
      </div>
    </div>
  );
}

function Counter({
  name,
  onDelete,
  initialCount,
  updateCounter,
}: {
  name: string;
  onDelete: () => void;
  initialCount?: number;
  updateCounter: (newCount: number) => void;
}) {
  const [count, setCount] = useState(initialCount ?? 0);
  return (
    <Card className="w-full md:max-w-[180px]">
      <CardHeader className="flex flex-col items-center justify-center min-w-[180px]  gap-6">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="text-sm">{name}</CardTitle>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onDelete}
            className="hover:text-red"
          >
            <Trash />
          </Button>
        </div>

        <CardContent className="text-4xl">{count}</CardContent>
      </CardHeader>
      <CardFooter className="flex justify-between w-full ">
        <Button
          size="icon-lg"
          variant="outline"
          onClick={() => {
            setCount(count - 1);
            updateCounter(count - 1);
          }}
        >
          <Minus />
        </Button>
        <Button
          size="icon-lg"
          variant="outline"
          onClick={() => {
            setCount(count + 1);
            updateCounter(count + 1);
          }}
        >
          <Plus />
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgentManagementPage() {
  const [showMembers, setShowMembers] = useState(false);
  const [players, setPlayers] = useState([
    { player1: "John Doe", player2: "Jane Smith", ic1: "A12345678", ic2: "B87654321" },
  ]);

  const [newPlayer, setNewPlayer] = useState({ player1: "", player2: "", ic1: "", ic2: "" });
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);


  const toggleMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const addPlayer = () => {
    if (newPlayer.player1 && newPlayer.player2 && newPlayer.ic1 && newPlayer.ic2) {
      setPlayers([...players, newPlayer]);
      setNewPlayer({ player1: "", player2: "", ic1: "", ic2: "" });
      setShowAddPlayerForm(false);
    }
  };

  

  return (
    <div className="pt-32 min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="border border-slate-800">
        <div className="px-4">
          <div className="flex h-14 items-center">
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-orange-400 border-b-2 border-orange-400 px-1 py-4 text-sm font-medium"
              >
                Mens Double
              </a>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-slate-800/50">
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="text-slate-200">
                  <div className="flex items-center space-x-1">Category</div>
                </TableHead>
                <TableHead className="text-slate-200">Date</TableHead>
                {/*    <TableHead className="text-slate-200">Player IC NO.</TableHead>
                <TableHead className="text-slate-200">Agent/Group</TableHead>
                <TableHead className="text-slate-200">Valid From</TableHead>
                <TableHead className="text-slate-200">Valid To</TableHead>
                <TableHead className="text-slate-200">Action</TableHead>  */}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-800/50">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={toggleMembers}
                  >
                    {showMembers ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="text-slate-200">
                  Mens Double (Bakat Baru)
                </TableCell>
                <TableCell className="text-slate-200">2025-01-01</TableCell>
                {/*  <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                    Active
                  </span>
                </TableCell>
                <TableCell className="text-slate-200">
                  CAROLINE GALOPE
                </TableCell>
                <TableCell className="text-slate-200">2025-01-22</TableCell>
                <TableCell className="text-slate-200">2025-01-28</TableCell> */}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Player
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Nested Members Table - Only shown when showMembers is true */}
          {showMembers && (
            <div className="border border-slate-800 p-4">
              {/* <h3 className="mb-4 text-lg font-medium text-slate-200">
      CAROLINE GALOPE Members
    </h3> */}
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-800/50">
                    <TableHead className="text-slate-200">
                      Player 1 Name
                    </TableHead>
                    <TableHead className="text-slate-200">
                      Player 2 Name
                    </TableHead>
                    <TableHead className="text-slate-200">
                      Player 1 IC NO
                    </TableHead>
                    <TableHead className="text-slate-200">
                      Player 2 IC NO
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Mock data rows */}
                  <TableRow className="hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">John Doe</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                    <TableCell className="text-slate-300">A12345678</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

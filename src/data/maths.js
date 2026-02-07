export const maths = {
  bidmas: [
    { id: 'b1', question: "6 + 3 × 2 = ?", answer: "12", working: "3×2=6, then 6+6=12 (Multiplication before addition)" },
    { id: 'b2', question: "(4 + 5) × 2 = ?", answer: "18", working: "Brackets first: 4+5=9, then 9×2=18" },
    { id: 'b3', question: "20 ÷ 4 + 3 = ?", answer: "8", working: "20÷4=5, then 5+3=8" },
    { id: 'b4', question: "15 - 3 × 4 + 2 = ?", answer: "5", working: "3×4=12, 15-12=3, 3+2=5" },
    { id: 'b5', question: "8 ÷ 2 × (2 + 2) = ?", answer: "16", working: "Brackets: 2+2=4, left to right: 8÷2=4, 4×4=16" }
  ],
  angles: [
    { id: 'a1', question: "How many degrees in a right angle?", answer: "90°", hint: "Think of a square corner" },
    { id: 'a2', question: "How many degrees in a straight line?", answer: "180°", hint: "Half a full rotation" },
    { id: 'a3', question: "How many degrees in a full circle?", answer: "360°", hint: "One complete turn" }
  ],
  shapes: [
    { id: 's1', question: "How many sides does a hexagon have?", answer: "6", hint: "Hex = 6 (like hexagon)" },
    { id: 's2', question: "What is the name of a 5-sided shape?", answer: "Pentagon", hint: "Pent = 5 (like pentathlon)" },
    { id: 's3', question: "How many faces does a cube have?", answer: "6", hint: "Think of a die" },
    { id: 's4', question: "What is the longest side of a right-angled triangle called?", answer: "Hypotenuse", hint: "Starts with H" },
    { id: 's5', question: "How many sides does an octagon have?", answer: "8", hint: "Oct = 8 (like octopus)" }
  ],
  formulas: [
    { id: 'f1', question: "If a = bc, make c the subject", answer: "c = a/b", hint: "Divide both sides by b" },
    { id: 'f2', question: "If y = mx + c, make x the subject", answer: "x = (y-c)/m", hint: "Subtract c, then divide by m" },
    { id: 'f3', question: "If A = πr², make r the subject", answer: "r = √(A/π)", hint: "Divide by π, then square root" }
  ]
}

export default maths

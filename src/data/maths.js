// BIDMAS - Order of Operations Questions
export const bidmas = [
  { id: 'b1', question: "What is 6 + 3 × 2?", answer: "12", hint: "Multiplication before addition", category: 'bidmas', difficulty: 'easy' },
  { id: 'b2', question: "What is (4 + 5) × 2?", answer: "18", hint: "Brackets first", category: 'bidmas', difficulty: 'easy' },
  { id: 'b3', question: "What is 20 ÷ 4 + 3?", answer: "8", hint: "Division before addition", category: 'bidmas', difficulty: 'easy' },
  { id: 'b4', question: "What is 15 - 3 × 4 + 2?", answer: "5", hint: "Multiply first, then left to right", category: 'bidmas', difficulty: 'medium' },
  { id: 'b5', question: "What is 8 ÷ 2 × (2 + 2)?", answer: "16", hint: "Brackets, then left to right", category: 'bidmas', difficulty: 'medium' },
  { id: 'b6', question: "What is 3 + 4 × 2?", answer: "11", hint: "Multiply first: 4×2=8, then add", category: 'bidmas', difficulty: 'easy' },
  { id: 'b7', question: "What is 10 - 2 × 3?", answer: "4", hint: "Multiply before subtracting", category: 'bidmas', difficulty: 'easy' },
  { id: 'b8', question: "What is (8 - 3) × 4?", answer: "20", hint: "Brackets first", category: 'bidmas', difficulty: 'easy' },
  { id: 'b9', question: "What is 18 ÷ 2 + 5?", answer: "14", hint: "Division before addition", category: 'bidmas', difficulty: 'easy' },
  { id: 'b10', question: "What is 2 × 3 + 4 × 2?", answer: "14", hint: "Do both multiplications first", category: 'bidmas', difficulty: 'medium' },
  { id: 'b11', question: "What is 50 ÷ (5 + 5)?", answer: "5", hint: "Brackets first, then divide", category: 'bidmas', difficulty: 'easy' },
  { id: 'b12', question: "What is 6 × 2 - 8 ÷ 4?", answer: "10", hint: "Multiply and divide first, left to right", category: 'bidmas', difficulty: 'medium' },
  { id: 'b13', question: "What is 2 + 3 × 4 - 5?", answer: "9", hint: "3×4=12, then 2+12-5", category: 'bidmas', difficulty: 'medium' },
  { id: 'b14', question: "What is (6 + 2) × (3 - 1)?", answer: "16", hint: "Both brackets first", category: 'bidmas', difficulty: 'medium' },
  { id: 'b15', question: "What is 100 ÷ 5 ÷ 2?", answer: "10", hint: "Left to right for division", category: 'bidmas', difficulty: 'easy' }
]

// Angles - Geometry Questions
export const angles = [
  { id: 'a1', question: "What type of angle is exactly 90 degrees?", answer: "Right angle", hint: "Like the corner of a square", category: 'angles', difficulty: 'easy' },
  { id: 'a2', question: "How many degrees in a straight line?", answer: "180", hint: "Half a full circle", category: 'angles', difficulty: 'easy' },
  { id: 'a3', question: "How many degrees in a full circle?", answer: "360", hint: "One complete rotation", category: 'angles', difficulty: 'easy' },
  { id: 'a4', question: "What type of angle is less than 90 degrees?", answer: "Acute", hint: "Think 'a cute little angle'", category: 'angles', difficulty: 'easy' },
  { id: 'a5', question: "What type of angle is between 90 and 180 degrees?", answer: "Obtuse", hint: "Larger than a right angle but not a straight line", category: 'angles', difficulty: 'easy' },
  { id: 'a6', question: "What type of angle is between 180 and 360 degrees?", answer: "Reflex", hint: "Larger than a straight line", category: 'angles', difficulty: 'medium' },
  { id: 'a7', question: "What do angles on a straight line add up to?", answer: "180 degrees", hint: "Half a turn", category: 'angles', difficulty: 'easy' },
  { id: 'a8', question: "What do angles in a triangle add up to?", answer: "180 degrees", hint: "Same as a straight line", category: 'angles', difficulty: 'easy' },
  { id: 'a9', question: "What do angles in a quadrilateral add up to?", answer: "360 degrees", hint: "Same as a full circle", category: 'angles', difficulty: 'medium' },
  { id: 'a10', question: "If one angle in a right-angled triangle is 40°, what is the other acute angle?", answer: "50°", hint: "Angles add to 180°, one is 90°", category: 'angles', difficulty: 'medium' },
  { id: 'a11', question: "How many degrees in each angle of an equilateral triangle?", answer: "60°", hint: "Three equal angles sum to 180°", category: 'angles', difficulty: 'medium' },
  { id: 'a12', question: "What is 270° as a fraction of a full turn?", answer: "3/4", hint: "360° is the whole, 270 is three quarters", category: 'angles', difficulty: 'medium' },
  { id: 'a13', question: "What do the two acute angles in a right-angled triangle add up to?", answer: "90°", hint: "Total is 180°, subtract the right angle", category: 'angles', difficulty: 'easy' }
]

// Shapes - Geometry Questions
export const shapes = [
  { id: 's1', question: "How many sides does a hexagon have?", answer: "6", hint: "Hex = 6 (like hexagon, hexabyte)", category: 'shapes', difficulty: 'easy' },
  { id: 's2', question: "What is the name of a 5-sided shape?", answer: "Pentagon", hint: "Pent = 5 (like pentathlon)", category: 'shapes', difficulty: 'easy' },
  { id: 's3', question: "How many faces does a cube have?", answer: "6", hint: "Count them on a dice", category: 'shapes', difficulty: 'easy' },
  { id: 's4', question: "What is the longest side of a right-angled triangle called?", answer: "Hypotenuse", hint: "Opposite the right angle", category: 'shapes', difficulty: 'medium' },
  { id: 's5', question: "How many sides does an octagon have?", answer: "8", hint: "Oct = 8 (like octopus)", category: 'shapes', difficulty: 'easy' },
  { id: 's6', question: "How many corners does a triangle have?", answer: "3", hint: "Same as its sides", category: 'shapes', difficulty: 'easy' },
  { id: 's7', question: "What is a 4-sided shape called?", answer: "Quadrilateral", hint: "Quad = 4", category: 'shapes', difficulty: 'easy' },
  { id: 's8', question: "How many edges does a cube have?", answer: "12", hint: "Count the lines where faces meet", category: 'shapes', difficulty: 'medium' },
  { id: 's9', question: "How many vertices (corners) does a cube have?", answer: "8", hint: "Corners of a box", category: 'shapes', difficulty: 'medium' },
  { id: 's10', question: "What is a 10-sided shape called?", answer: "Decagon", hint: "Dec = 10 (like decade)", category: 'shapes', difficulty: 'medium' },
  { id: 's11', question: "How many sides does a heptagon have?", answer: "7", hint: "Hept = 7 (seven sides)", category: 'shapes', difficulty: 'hard' },
  { id: 's12', question: "What is a 9-sided shape called?", answer: "Nonagon", hint: "Non = 9", category: 'shapes', difficulty: 'hard' },
  { id: 's13', question: "How many sides does a dodecagon have?", answer: "12", hint: "Dodeca = 12 (like dozen)", category: 'shapes', difficulty: 'hard' },
  { id: 's14', question: "What shape has all sides equal and all angles equal?", answer: "Regular polygon", hint: "Think equilateral for triangles", category: 'shapes', difficulty: 'medium' },
  { id: 's15', question: "How many faces does a triangular prism have?", answer: "5", hint: "2 triangles + 3 rectangles", category: 'shapes', difficulty: 'hard' }
]

// Formulas - Rearranging Questions
export const formulas = [
  { id: 'f1', question: "If A = B × C, what is B?", answer: "A ÷ C", hint: "Divide both sides by C", category: 'formulas', difficulty: 'easy' },
  { id: 'f2', question: "If y = mx + c, what is x?", answer: "(y - c) ÷ m", hint: "Subtract c, then divide by m", category: 'formulas', difficulty: 'medium' },
  { id: 'f3', question: "If A = πr², what is r?", answer: "√(A ÷ π)", hint: "Divide by π, then square root", category: 'formulas', difficulty: 'hard' },
  { id: 'f4', question: "If D = S × T (distance = speed × time), what is S?", answer: "D ÷ T", hint: "Rearrange to find speed", category: 'formulas', difficulty: 'easy' },
  { id: 'f5', question: "If A = L × W (area of rectangle), what is L?", answer: "A ÷ W", hint: "Divide area by width", category: 'formulas', difficulty: 'easy' },
  { id: 'f6', question: "If P = 2L + 2W (perimeter of rectangle), what is L?", answer: "(P - 2W) ÷ 2", hint: "Subtract 2W, then divide by 2", category: 'formulas', difficulty: 'medium' },
  { id: 'f7', question: "If V = IR (Ohm's law), what is I?", answer: "V ÷ R", hint: "Divide voltage by resistance", category: 'formulas', difficulty: 'easy' },
  { id: 'f8', question: "If C = 2πr (circumference), what is r?", answer: "C ÷ 2π", hint: "Divide by 2π", category: 'formulas', difficulty: 'easy' },
  { id: 'f9', question: "If F = ma (force = mass × acceleration), what is a?", answer: "F ÷ m", hint: "Divide force by mass", category: 'formulas', difficulty: 'easy' },
  { id: 'f10', question: "If E = mc² (Einstein's equation), what is m?", answer: "E ÷ c²", hint: "Divide by c²", category: 'formulas', difficulty: 'medium' },
  { id: 'f11', question: "If v = u + at, what is a?", answer: "(v - u) ÷ t", hint: "Subtract u, then divide by t", category: 'formulas', difficulty: 'medium' },
  { id: 'f12', question: "If A = ½bh (area of triangle), what is h?", answer: "(2 × A) ÷ b", hint: "Multiply by 2, divide by base", category: 'formulas', difficulty: 'medium' }
]

export default { bidmas, angles, shapes, formulas }

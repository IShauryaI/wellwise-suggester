
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Star, ThumbsUp, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for demonstration
const medicineEffectivenessData = [
  { name: "Metformin", effectiveness: 4.2 },
  { name: "Lisinopril", effectiveness: 3.9 },
  { name: "Atorvastatin", effectiveness: 4.5 },
  { name: "Levothyroxine", effectiveness: 4.7 },
  { name: "Omeprazole", effectiveness: 4.1 },
  { name: "Cetirizine", effectiveness: 4.8 },
];

const sideEffectsData = [
  { name: "None", value: 42 },
  { name: "Mild", value: 28 },
  { name: "Moderate", value: 18 },
  { name: "Severe", value: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const reviews = [
  {
    id: "1",
    reviewer: "Sarah J.",
    date: "March 15, 2025",
    medicineName: "Metformin 500mg",
    condition: "Type 2 Diabetes",
    text: "I've been taking Metformin for about 6 months now for my Type 2 Diabetes. It has helped control my blood sugar levels effectively, though it took about 2-3 weeks to see significant improvements. The first two weeks were challenging due to some digestive issues, but those subsided after my body adjusted to the medication.",
    ratings: {
      effectiveness: 4,
      sideEffects: 3,
      easeOfUse: 5,
      satisfaction: 4
    },
    wouldRecommend: "Yes",
    helpfulCount: 24
  },
  {
    id: "2",
    reviewer: "Michael T.",
    date: "March 10, 2025",
    medicineName: "Lisinopril 10mg",
    condition: "Hypertension",
    text: "I started taking Lisinopril about 3 months ago for high blood pressure. It's been quite effective at bringing my numbers down from 150/95 to around 125/80 consistently. The medication works well, but I did experience a persistent dry cough which is apparently a common side effect.",
    ratings: {
      effectiveness: 5,
      sideEffects: 2,
      easeOfUse: 5,
      satisfaction: 3
    },
    wouldRecommend: "Maybe",
    helpfulCount: 18
  },
  {
    id: "3",
    reviewer: "Taylor W.",
    date: "March 5, 2025",
    medicineName: "Cetirizine 10mg",
    condition: "Seasonal Allergies",
    text: "I've been using Cetirizine for my seasonal allergies for years now, and it consistently provides relief from my symptoms. Unlike some other antihistamines I've tried, this one doesn't make me feel drowsy, which is a huge plus since I take it daily during allergy season.",
    ratings: {
      effectiveness: 5,
      sideEffects: 5,
      easeOfUse: 5,
      satisfaction: 5
    },
    wouldRecommend: "Yes",
    helpfulCount: 31
  }
];

const conditionPrevalenceData = [
  { name: "Type 2 Diabetes", count: 145 },
  { name: "Hypertension", count: 203 },
  { name: "Seasonal Allergies", count: 189 },
  { name: "Anxiety", count: 98 },
  { name: "Asthma", count: 76 },
];

const PharmaRepDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const renderReadOnlyStars = (count) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review =>
    review.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Pharmaceutical Insights Dashboard</h1>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
          <p className="text-3xl font-bold text-primary">432</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Average Satisfaction</h3>
          <p className="text-3xl font-bold text-primary">4.2/5</p>
          <p className="text-sm text-gray-500 mt-1">Based on all reviews</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Most Reviewed</h3>
          <p className="text-3xl font-bold text-primary">Metformin</p>
          <p className="text-sm text-gray-500 mt-1">145 reviews</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Medication Effectiveness Ratings</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={medicineEffectivenessData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="effectiveness" fill="#8884d8" name="Effectiveness Rating (out of 5)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Side Effect Severity Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sideEffectsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sideEffectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Condition Prevalence Among Reviewers</h2>
        <div className="h-80">
          <ChartContainer
            config={{
              condition: { color: "#8884d8" },
              count: { color: "#82ca9d" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conditionPrevalenceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="count" name="Number of Patients" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold">Customer Medicine Reviews</h2>
          <div className="mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search by medicine or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableCaption>A list of recent medicine reviews</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Effectiveness</TableHead>
              <TableHead>Side Effects</TableHead>
              <TableHead>Overall</TableHead>
              <TableHead>Would Recommend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.medicineName}</TableCell>
                <TableCell>{review.condition}</TableCell>
                <TableCell>{renderReadOnlyStars(review.ratings.effectiveness)}</TableCell>
                <TableCell>{renderReadOnlyStars(review.ratings.sideEffects)}</TableCell>
                <TableCell>{renderReadOnlyStars(review.ratings.satisfaction)}</TableCell>
                <TableCell>{review.wouldRecommend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Reviews List */}
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold">Review Details</h3>
          
          {filteredReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{review.medicineName}</h4>
                  <p className="text-sm text-gray-500">
                    Reviewed by {review.reviewer} on {review.date}
                  </p>
                </div>
                <div className="flex items-center">
                  {renderReadOnlyStars(review.ratings.satisfaction)}
                  <span className="ml-2 text-sm font-medium">
                    Overall: {review.ratings.satisfaction}/5
                  </span>
                </div>
              </div>
              
              <p className="mb-3 text-sm">{review.text}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-semibold">Condition:</span> {review.condition}
                </div>
                <div>
                  <span className="font-semibold">Would Recommend:</span> {review.wouldRecommend}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-gray-500" />
                  <span>{review.helpfulCount} found this helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmaRepDashboard;

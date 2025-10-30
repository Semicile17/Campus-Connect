"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface SubjectChartProps {
  subjectId: string;
  subjectName: string;
  taken: number;
  total: number;
  pending: number;
}

interface MonthlyData {
  month: string;
  classes: number;
}

interface FacultyChartsProps {
  subjectChartData: SubjectChartProps[];
  monthlyData: MonthlyData[];
}

export function FacultyCharts({ subjectChartData, monthlyData }: FacultyChartsProps) {
  return (
    <>
      {/* 📊 Monthly Classes Overview */}
      <div className="shadow-xl border-0 bg-white/80 backdrop-blur-sm lg:col-span-2 rounded-lg">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Classes Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="classes" name="Classes Conducted" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🎓 Subjects with Progress Charts */}
      {subjectChartData.map((subject, index) => {
        const percentage = Math.round((subject.taken / subject.total) * 100);
        const data = [
          { name: 'Classes Taken', value: subject.taken },
          { name: 'Classes Pending', value: subject.pending }
        ];
        
        return (
          <div key={subject.subjectId} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {subject.subjectName}
              </h3>
              
              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{subject.taken} classes taken</span>
                  <span>{subject.pending} classes pending</span>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2">
                Total: {subject.total} classes • {subject.taken} completed
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
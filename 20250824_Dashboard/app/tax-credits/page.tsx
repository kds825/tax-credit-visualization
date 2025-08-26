"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Building2, FileText } from "lucide-react"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const taxCreditData = [
  {
    name: "국가전략",
    value: 18000, // 연구비 (세액공제액 * 1.5 배율로 계산)
    count: 8,
    color: "#f5f5f5", // 아주 연한 회색
    stroke: "#000000", // 검은색 테두리
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", amount: 7200, team: 8, progress: 75 },
      { id: 4, name: "블록체인 보안 솔루션", amount: 9000, team: 10, progress: 60 },
      { id: 6, name: "자율주행 센서 시스템", amount: 6600, team: 9, progress: 35 },
    ],
  },
  {
    name: "신성장",
    value: 12600, // 연구비
    count: 12,
    color: "#404040", // 짙은 회색
    stroke: "#000000",
    projects: [
      { id: 2, name: "친환경 배터리 소재 개발", amount: 5100, team: 6, progress: 100 },
      { id: 5, name: "양자컴퓨팅 알고리즘", amount: 8400, team: 7, progress: 40 },
      { id: 7, name: "나노소재 합성기술", amount: 4200, team: 5, progress: 80 },
      { id: 8, name: "바이오센서 개발", amount: 4800, team: 6, progress: 65 },
    ],
  },
  {
    name: "일반",
    value: 5400, // 연구비
    count: 4,
    color: "#808080", // 회색
    stroke: "#000000",
    projects: [
      { id: 3, name: "스마트팜 IoT 플랫폼", amount: 3600, team: 5, progress: 25 },
      { id: 9, name: "모바일 앱 개발", amount: 1800, team: 4, progress: 90 },
    ],
  },
]

const monthlyTrend = [
  { month: "1월", 국가전략: 1200, 신성장: 900, 일반: 300 },
  { month: "2월", 국가전략: 1800, 신성장: 1200, 일반: 450 },
  { month: "3월", 국가전략: 2400, 신성장: 1500, 일반: 600 },
  { month: "4월", 국가전략: 3000, 신성장: 1800, 일반: 750 },
  { month: "5월", 국가전략: 3600, 신성장: 2100, 일반: 900 },
  { month: "6월", 국가전략: 4200, 신성장: 2400, 일반: 1050 },
  { month: "7월", 국가전략: 4800, 신성장: 2700, 일반: 1200 },
  { month: "8월", 국가전략: 5400, 신성장: 3000, 일반: 1350 },
  { month: "9월", 국가전략: 6000, 신성장: 3300, 일반: 1500 },
  { month: "10월", 국가전략: 6600, 신성장: 3600, 일반: 1650 },
  { month: "11월", 국가전략: 7200, 신성장: 3900, 일반: 1800 },
  { month: "12월", 국가전략: 7800, 신성장: 4200, 일반: 1950 },
]

export default function TaxCreditsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const totalAmount = taxCreditData.reduce((sum, item) => sum + item.value, 0)
  const totalProjects = taxCreditData.reduce((sum, item) => sum + item.count, 0)

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(selectedCategory === category.name ? null : category.name)
    setSelectedProject(null)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project)
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, count, index }: any) => {
    const RADIAN = Math.PI / 180
    const isHovered = hoveredIndex === index
    const radius = outerRadius + (isHovered ? 35 : 25)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <g>
        <text
          x={x}
          y={y - 8}
          fill="#000000"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={isHovered ? "14" : "12"}
          fontWeight="bold"
        >
          {`${name}`}
        </text>
        <text
          x={x}
          y={y + 5}
          fill="#000000"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={isHovered ? "12" : "10"}
          fontWeight="600"
        >
          {`${count}개`}
        </text>
        <text
          x={x}
          y={y + 18}
          fill="#666666"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="10"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                메인으로
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">연구비 현황</h1>
              <p className="text-sm text-muted-foreground mt-1">국가전략/신성장/일반 프로젝트별 연구비 현황</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">총 연구비</p>
                  <p className="text-2xl font-bold text-foreground">₩{(totalAmount / 100).toFixed(1)}억</p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">총 프로젝트</p>
                  <p className="text-2xl font-bold text-foreground">{totalProjects}개</p>
                </div>
                <Building2 className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">이번달 증가</p>
                  <p className="text-2xl font-bold text-foreground">+12%</p>
                </div>
                <FileText className="h-8 w-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">연구비 분포</CardTitle>
              <CardDescription>프로젝트 유형별 연구비 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taxCreditData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onClick={handleCategoryClick}
                      className="cursor-pointer"
                      onMouseEnter={(_, index) => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {taxCreditData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={entry.stroke}
                          strokeWidth={hoveredIndex === index ? 3 : 2}
                          style={{
                            filter: hoveredIndex === index ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none",
                            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                            transformOrigin: "center",
                            transition: "all 0.2s ease-in-out",
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [`₩${(value / 100).toFixed(1)}억`, "연구비"]}
                      labelFormatter={(label) => `${label} 프로젝트`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {taxCreditData.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCategory === item.name ? "ring-2 ring-accent" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleCategoryClick(item)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <p className="text-lg font-bold">₩{(item.value / 100).toFixed(1)}억</p>
                    <p className="text-xs text-muted-foreground">{item.count}개 프로젝트</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">월별 연구비 추이</CardTitle>
              <CardDescription>2024년 월별 누적 연구비 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`₩${value}만`, ""]} />
                    <Legend />
                    <Bar dataKey="국가전략" stackId="a" fill="#f5f5f5" stroke="#000000" strokeWidth={1} />
                    <Bar dataKey="신성장" stackId="a" fill="#404040" stroke="#000000" strokeWidth={1} />
                    <Bar dataKey="일반" stackId="a" fill="#808080" stroke="#000000" strokeWidth={1} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedCategory && (
          <Card className="mb-8 border-accent/20">
            <CardHeader>
              <CardTitle className="font-serif">{selectedCategory} 프로젝트 현황</CardTitle>
              <CardDescription>
                {taxCreditData.find((c) => c.name === selectedCategory)?.projects.length}개 프로젝트 상세 정보
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taxCreditData
                  .find((c) => c.name === selectedCategory)
                  ?.projects.map((project) => (
                    <Card
                      key={project.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedProject?.id === project.id ? "ring-2 ring-accent" : ""
                      }`}
                      onClick={() => handleProjectClick(project)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium text-sm">{project.name}</h3>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {selectedCategory}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">연구비</p>
                              <p className="font-bold text-accent">₩{(project.amount / 100).toFixed(1)}억</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">팀 규모</p>
                              <p className="font-medium">{project.team}명</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">진행률</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-accent h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Link href={`/projects/${project.id}?from=tax-credits`}>
                            <Button size="sm" className="w-full text-xs">
                              프로젝트 상세보기
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedProject && (
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="font-serif">{selectedProject.name} 상세정보</CardTitle>
              <CardDescription>프로젝트 세부 현황 및 팀 구성</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">연구비</p>
                    <p className="text-2xl font-bold text-accent">₩{(selectedProject.amount / 100).toFixed(1)}억</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">팀 규모</p>
                    <p className="text-2xl font-bold">{selectedProject.team}명</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">진행률</p>
                    <p className="text-2xl font-bold">{selectedProject.progress}%</p>
                  </div>
                </Card>
              </div>
              <div className="mt-6 flex gap-4">
                <Link href={`/projects/${selectedProject.id}?from=tax-credits`}>
                  <Button>프로젝트 상세보기</Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  닫기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

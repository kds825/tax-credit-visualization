"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/lib/currency-context";

const mockProjects = [
  {
    id: 1,
    name: "AI 기반 의료진단 시스템",
    type: "국가전략",
    status: "진행중",
    progress: 75,
    budget: "2.4",
    spent: "1.8",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    teamSize: 8,
    manager: "김연구",
  },
  {
    id: 2,
    name: "친환경 배터리 소재 개발",
    type: "신성장",
    status: "완료",
    progress: 100,
    budget: "1.8",
    spent: "1.7",
    startDate: "2023-06-01",
    endDate: "2024-11-30",
    teamSize: 6,
    manager: "이개발",
  },
  {
    id: 3,
    name: "스마트팜 IoT 플랫폼",
    type: "일반",
    status: "검토중",
    progress: 25,
    budget: "1.2",
    spent: "0.3",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    teamSize: 5,
    manager: "박기술",
  },
  {
    id: 4,
    name: "블록체인 보안 솔루션",
    type: "국가전략",
    status: "진행중",
    progress: 60,
    budget: "3.0",
    spent: "1.8",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    teamSize: 10,
    manager: "최보안",
  },
  {
    id: 5,
    name: "양자컴퓨팅 알고리즘",
    type: "신성장",
    status: "진행중",
    progress: 40,
    budget: "2.8",
    spent: "1.1",
    startDate: "2024-05-01",
    endDate: "2025-04-30",
    teamSize: 7,
    manager: "정양자",
  },
  {
    id: 6,
    name: "자율주행 센서 시스템",
    type: "국가전략",
    status: "지연",
    progress: 35,
    budget: "2.2",
    spent: "1.0",
    startDate: "2024-02-01",
    endDate: "2024-12-31",
    teamSize: 9,
    manager: "한자율",
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const { unit, setUnit, formatAmount } = useCurrency();

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "완료":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "진행중":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "지연":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "검토중":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "국가전략":
        return "bg-chart-1 text-white";
      case "신성장":
        return "bg-chart-2 text-white";
      case "일반":
        return "bg-chart-3 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const totalStats = {
    totalProjects: filteredProjects.length,
    totalBudget: filteredProjects.reduce(
      (sum, p) => sum + Number.parseFloat(p.budget),
      0
    ),
    totalSpent: filteredProjects.reduce(
      (sum, p) => sum + Number.parseFloat(p.spent),
      0
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                메인으로
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-serif font-bold text-foreground">
                프로젝트별 현황
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                연구개발 프로젝트 통합 관리
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">단위:</span>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24 border border-gray-300 shadow-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="백만원">백만원</SelectItem>
                  <SelectItem value="십억원">십억원</SelectItem>
                  <SelectItem value="조원">조원</SelectItem>
                </SelectContent>
              </Select>
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
                  <p className="text-sm font-medium text-muted-foreground">
                    총 프로젝트
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalStats.totalProjects}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    총 예산
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatAmount(totalStats.totalBudget.toString())}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    사용액
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatAmount(totalStats.totalSpent.toString())}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="프로젝트명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border border-gray-300 shadow-xs"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 border border-gray-300 shadow-xs">
                  <SelectValue placeholder="프로젝트 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 유형</SelectItem>
                  <SelectItem value="국가전략">국가전략</SelectItem>
                  <SelectItem value="신성장">신성장</SelectItem>
                  <SelectItem value="일반">일반</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 border border-gray-300 shadow-xs">
                  <SelectValue placeholder="진행 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="진행중">진행중</SelectItem>
                  <SelectItem value="완료">완료</SelectItem>
                  <SelectItem value="지연">지연</SelectItem>
                  <SelectItem value="검토중">검토중</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-serif mb-2">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`text-xs ${getTypeColor(project.type)}`}
                      >
                        {project.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-muted-foreground">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>진행률</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">예산</p>
                      <p className="font-medium">
                        {formatAmount(project.budget)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">사용액</p>
                      <p className="font-medium">
                        {formatAmount(project.spent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">팀 규모</p>
                      <p className="font-medium">{project.teamSize}명</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">책임자</p>
                      <p className="font-medium">{project.manager}</p>
                    </div>
                  </div>

                  {/* Project Manager & Dates */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-muted-foreground">시작일</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">종료일</p>
                        <p className="font-medium">{project.endDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/projects/${project.id}`}>
                    <Button className="w-full mt-4">상세보기</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                검색 조건에 맞는 프로젝트가 없습니다.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

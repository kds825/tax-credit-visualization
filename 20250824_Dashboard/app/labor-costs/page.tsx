"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  Users,
  Clock,
  Building2,
  UserPlus,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

const organizationData = {
  ceo: { name: "김대표", position: "대표이사" },
  departments: [
    {
      name: "AI연구소",
      head: "박연구소장",
      teams: [
        { name: "머신러닝팀", lead: "이ML", members: 8 },
        { name: "딥러닝팀", lead: "김DL", members: 6 },
      ],
    },
    {
      name: "개발팀",
      head: "최개발팀장",
      teams: [
        { name: "백엔드팀", lead: "정백엔드", members: 5 },
        { name: "프론트엔드팀", lead: "한프론트", members: 4 },
      ],
    },
    {
      name: "데이터분석팀",
      head: "윤데이터팀장",
      teams: [
        { name: "분석팀", lead: "조분석", members: 6 },
        { name: "시각화팀", lead: "신시각화", members: 3 },
      ],
    },
  ],
};

const registrationStats = {
  totalRegistered: 48,
  newThisMonth: 3,
  pendingApproval: 2,
  byDepartment: [
    { name: "AI연구소", count: 14, growth: "+2" },
    { name: "개발팀", count: 9, growth: "+1" },
    { name: "데이터분석팀", count: 9, growth: "0" },
    { name: "품질관리팀", count: 6, growth: "0" },
    { name: "디자인팀", count: 5, growth: "0" },
    { name: "외부자문", count: 5, growth: "0" },
  ],
};

const projectAssignmentStats = {
  totalProjects: 24,
  assignedResearchers: 45,
  unassignedResearchers: 3,
  averageProjectsPerResearcher: 2.8,
  assignments: [
    {
      projectName: "AI 기반 의료진단 시스템",
      assignedCount: 8,
      type: "국가전략",
    },
    {
      projectName: "친환경 배터리 소재 개발",
      assignedCount: 6,
      type: "신성장",
    },
    { projectName: "스마트팜 IoT 플랫폼", assignedCount: 5, type: "일반" },
    { projectName: "블록체인 보안 솔루션", assignedCount: 7, type: "국가전략" },
    { projectName: "양자컴퓨팅 알고리즘", assignedCount: 4, type: "신성장" },
  ],
};

const mockResearchers = [
  {
    id: 1,
    name: "김연구",
    role: "프로젝트 매니저",
    department: "AI연구소",
    totalHours: 480,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 160 },
      { id: 4, name: "블록체인 보안 솔루션", type: "국가전략", hours: 120 },
      { id: 7, name: "나노소재 합성기술", type: "신성장", hours: 200 },
    ],
  },
  {
    id: 2,
    name: "이AI",
    role: "AI 연구원",
    department: "AI연구소",
    totalHours: 540,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 180 },
      { id: 5, name: "양자컴퓨팅 알고리즘", type: "신성장", hours: 160 },
      { id: 8, name: "바이오센서 개발", type: "신성장", hours: 200 },
    ],
  },
  {
    id: 3,
    name: "박데이터",
    role: "데이터 사이언티스트",
    department: "데이터분석팀",
    totalHours: 510,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 170 },
      { id: 2, name: "친환경 배터리 소재 개발", type: "신성장", hours: 140 },
      { id: 3, name: "스마트팜 IoT 플랫폼", type: "일반", hours: 200 },
    ],
  },
  {
    id: 4,
    name: "최개발",
    role: "백엔드 개발자",
    department: "개발팀",
    totalHours: 480,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 160 },
      { id: 4, name: "블록체인 보안 솔루션", type: "국가전략", hours: 180 },
      { id: 9, name: "모바일 앱 개발", type: "일반", hours: 140 },
    ],
  },
  {
    id: 5,
    name: "정프론트",
    role: "프론트엔드 개발자",
    department: "개발팀",
    totalHours: 450,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 150 },
      { id: 3, name: "스마트팜 IoT 플랫폼", type: "일반", hours: 160 },
      { id: 9, name: "모바일 앱 개발", type: "일반", hours: 140 },
    ],
  },
  {
    id: 6,
    name: "한테스트",
    role: "QA 엔지니어",
    department: "품질관리팀",
    totalHours: 420,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 140 },
      { id: 2, name: "친환경 배터리 소재 개발", type: "신성장", hours: 120 },
      { id: 5, name: "양자컴퓨팅 알고리즘", type: "신성장", hours: 160 },
    ],
  },
  {
    id: 7,
    name: "윤디자인",
    role: "UI/UX 디자이너",
    department: "디자인팀",
    totalHours: 360,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 120 },
      { id: 3, name: "스마트팜 IoT 플랫폼", type: "일반", hours: 140 },
      { id: 9, name: "모바일 앱 개발", type: "일반", hours: 100 },
    ],
  },
  {
    id: 8,
    name: "조의료",
    role: "의료 자문",
    department: "외부자문",
    totalHours: 240,
    projects: [
      { id: 1, name: "AI 기반 의료진단 시스템", type: "국가전략", hours: 80 },
      { id: 8, name: "바이오센서 개발", type: "신성장", hours: 160 },
    ],
  },
];

export default function ResearchInstituteStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const filteredResearchers = mockResearchers.filter((researcher) => {
    const matchesSearch =
      researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || researcher.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getResearchersByDepartment = (department: string | null) => {
    if (!department) return mockResearchers;
    return mockResearchers.filter((r) => r.department === department);
  };

  const departments = Array.from(
    new Set(mockResearchers.map((r) => r.department))
  );

  const totalStats = {
    totalResearchers: mockResearchers.length,
    totalHours: mockResearchers.reduce((sum, r) => sum + r.totalHours, 0),
    totalDepartments: departments.length,
  };

  const departmentData = departments.map((dept) => {
    const deptResearchers = mockResearchers.filter(
      (r) => r.department === dept
    );
    return {
      name: dept,
      count: deptResearchers.length,
      totalHours: deptResearchers.reduce((sum, r) => sum + r.totalHours, 0),
    };
  });

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
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                연구소 현황
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                조직도, 연구원 등록 현황, 프로젝트 배정 및 부서별 인력 현황
              </p>
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
                    총 인원
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalStats.totalResearchers}명
                  </p>
                </div>
                <Users className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    총 투입시간
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalStats.totalHours.toLocaleString()}시간
                  </p>
                </div>
                <Clock className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    부서 수
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalStats.totalDepartments}개
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-200 text-black">
            <TabsTrigger value="organization">조직도</TabsTrigger>
            <TabsTrigger value="registration">연구원 등록 현황</TabsTrigger>
            <TabsTrigger value="assignment">프로젝트 배정 현황</TabsTrigger>
            <TabsTrigger value="researchers">연구원 목록</TabsTrigger>
            <TabsTrigger value="departments">부서별 인력 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="organization">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">조직도</CardTitle>
                <CardDescription>
                  연구소 조직 구조 및 부서별 인력 배치
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <svg
                    width="800"
                    height="500"
                    viewBox="0 0 800 500"
                    className="border rounded-lg bg-slate-50"
                  >
                    <rect
                      x="350"
                      y="20"
                      width="100"
                      height="60"
                      rx="8"
                      fill="#1e293b"
                    />
                    <text
                      x="400"
                      y="40"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {organizationData.ceo.name}
                    </text>
                    <text
                      x="400"
                      y="55"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                    >
                      {organizationData.ceo.position}
                    </text>

                    <line
                      x1="400"
                      y1="80"
                      x2="400"
                      y2="120"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    <line
                      x1="150"
                      y1="120"
                      x2="650"
                      y2="120"
                      stroke="#64748b"
                      strokeWidth="2"
                    />

                    {organizationData.departments.map((dept, index) => {
                      const x = 150 + index * 250;
                      return (
                        <g key={index}>
                          <line
                            x1={x + 50}
                            y1="120"
                            x2={x + 50}
                            y2="150"
                            stroke="#64748b"
                            strokeWidth="2"
                          />
                          <rect
                            x={x}
                            y="150"
                            width="100"
                            height="50"
                            rx="6"
                            fill="#475569"
                          />
                          <text
                            x={x + 50}
                            y="170"
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {dept.name}
                          </text>
                          <text
                            x={x + 50}
                            y="185"
                            textAnchor="middle"
                            fill="white"
                            fontSize="9"
                          >
                            {dept.head}
                          </text>

                          {dept.teams.map((team, teamIndex) => {
                            const teamX = x - 30 + teamIndex * 60;
                            const teamY = 250;
                            return (
                              <g key={teamIndex}>
                                <line
                                  x1={x + 50}
                                  y1="200"
                                  x2={x + 50}
                                  y2="230"
                                  stroke="#64748b"
                                  strokeWidth="1"
                                />
                                <line
                                  x1={x + 20}
                                  y1="230"
                                  x2={x + 80}
                                  y2="230"
                                  stroke="#64748b"
                                  strokeWidth="1"
                                />
                                <line
                                  x1={teamX + 25}
                                  y1="230"
                                  x2={teamX + 25}
                                  y2="250"
                                  stroke="#64748b"
                                  strokeWidth="1"
                                />
                                <rect
                                  x={teamX}
                                  y={teamY}
                                  width="50"
                                  height="40"
                                  rx="4"
                                  fill="#e2e8f0"
                                  stroke="#94a3b8"
                                />
                                <text
                                  x={teamX + 25}
                                  y={teamY + 15}
                                  textAnchor="middle"
                                  fill="#1e293b"
                                  fontSize="8"
                                  fontWeight="bold"
                                >
                                  {team.name}
                                </text>
                                <text
                                  x={teamX + 25}
                                  y={teamY + 25}
                                  textAnchor="middle"
                                  fill="#64748b"
                                  fontSize="7"
                                >
                                  {team.lead}
                                </text>
                                <text
                                  x={teamX + 25}
                                  y={teamY + 35}
                                  textAnchor="middle"
                                  fill="#64748b"
                                  fontSize="7"
                                >
                                  ({team.members}명)
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      연구원 등록 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {registrationStats.totalRegistered}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            총 등록자
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {registrationStats.newThisMonth}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            이번달 신규
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            {registrationStats.pendingApproval}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            승인 대기
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">
                      부서별 등록 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {registrationStats.byDepartment.map((dept, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                            selectedDepartment === dept.name
                              ? "bg-primary/10 border border-primary"
                              : "bg-muted/50 hover:bg-muted"
                          }`}
                          onClick={() =>
                            setSelectedDepartment(
                              selectedDepartment === dept.name
                                ? null
                                : dept.name
                            )
                          }
                        >
                          <span className="font-medium">{dept.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{dept.count}명</span>
                            <Badge
                              variant={
                                dept.growth.startsWith("+")
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {dept.growth}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">
                    {selectedDepartment
                      ? `${selectedDepartment} 연구원`
                      : "전체 등록 연구원"}
                  </CardTitle>
                  <CardDescription>
                    {selectedDepartment
                      ? `${selectedDepartment} 소속 연구원 목록`
                      : "모든 부서의 등록된 연구원"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {getResearchersByDepartment(selectedDepartment).map(
                      (researcher) => (
                        <div
                          key={researcher.id}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded"
                        >
                          <div>
                            <p className="font-medium">{researcher.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {researcher.role}
                            </p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {researcher.department}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {researcher.totalHours}시간
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {researcher.projects.length}개 프로젝트
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    프로젝트 배정 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {projectAssignmentStats.assignedResearchers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          배정된 연구원
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">
                          {projectAssignmentStats.unassignedResearchers}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          미배정 연구원
                        </p>
                      </div>
                    </div>
                    <div className="text-center pt-4 border-t">
                      <p className="text-lg font-bold text-foreground">
                        {projectAssignmentStats.averageProjectsPerResearcher}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        연구원당 평균 프로젝트 수
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">
                    프로젝트별 배정 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectAssignmentStats.assignments.map(
                      (assignment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {assignment.projectName}
                            </p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {assignment.type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">
                              {assignment.assignedCount}명
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="researchers">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="연구원명 또는 역할로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterDepartment}
                    onValueChange={setFilterDepartment}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 부서</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">연구원 목록</CardTitle>
                <CardDescription>
                  연구원별 투입시간 및 프로젝트 참여 현황
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResearchers.map((researcher) => (
                    <Card
                      key={researcher.id}
                      className="transition-all hover:shadow-md"
                    >
                      <CardContent className="py-px px-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-muted rounded-full flex items-center justify-center">
                              <Users className="h-1.5 w-1.5 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm leading-none">
                                {researcher.name}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                                {researcher.role}
                              </p>
                              <Badge
                                variant="outline"
                                className="text-xs h-3 px-1 mt-0.5"
                              >
                                {researcher.department}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold leading-none">
                              {researcher.totalHours}시간
                            </p>
                            <p className="text-sm text-muted-foreground leading-none mt-0.5">
                              {researcher.projects.length}개 프로젝트
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">부서별 인력 현황</CardTitle>
                <CardDescription>부서별 연구원 수 및 투입시간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departmentData.map((dept) => (
                    <Card key={dept.name} className="p-4">
                      <div className="text-center space-y-2">
                        <h4 className="font-medium">{dept.name}</h4>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-foreground">
                            {dept.count}명
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dept.totalHours.toLocaleString()}시간
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, PieChart, Users, FolderOpen, Calculator, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const mainFeatures = [
    {
      id: "projects",
      title: "프로젝트별 현황",
      description: "프로젝트별 세부내역",
      icon: FolderOpen,
      color: "bg-gradient-to-br from-slate-600 to-slate-800",
      hoverColor: "hover:from-slate-500 hover:to-slate-700",
      stats: { count: 24, label: "진행중인 프로젝트" },
    },
    {
      id: "tax-credits",
      title: "연구비 현황",
      description: "국가전략/신성장/일반 프로젝트별 연구비 현황",
      icon: PieChart,
      color: "bg-gradient-to-br from-slate-700 to-slate-900",
      hoverColor: "hover:from-slate-600 hover:to-slate-800",
      stats: { count: "₩13.2억", label: "총 연구비" },
    },
    {
      id: "labor-costs",
      title: "연구소 현황", // 연구원 현황을 연구소 현황으로 변경
      description: "조직도, 연구원 등록 현황, 프로젝트 배정 및 부서별 인력 현황",
      icon: Users,
      color: "bg-gradient-to-br from-slate-800 to-black",
      hoverColor: "hover:from-slate-700 hover:to-slate-900",
      stats: { count: 48, label: "등록된 연구원" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-8 py-12">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature) => (
              <Card
                key={feature.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white/70 backdrop-blur-sm ${
                  activeSection === feature.id ? "ring-2 ring-slate-400 shadow-2xl" : ""
                }`}
                onClick={() => setActiveSection(activeSection === feature.id ? null : feature.id)}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-14 w-14 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-serif text-slate-900 mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-3xl font-bold text-slate-900 mb-1">{feature.stats.count}</p>
                      <p className="text-sm text-slate-500">{feature.stats.label}</p>
                    </div>
                    <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-slate-600" />
                    </div>
                  </div>
                  <Link
                    href={
                      feature.id === "projects"
                        ? "/projects"
                        : feature.id === "tax-credits"
                          ? "/tax-credits"
                          : "/labor-costs"
                    }
                  >
                    <Button
                      className={`w-full transition-all duration-300 ${
                        activeSection === feature.id
                          ? "bg-slate-800 hover:bg-slate-700 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-0"
                      }`}
                    >
                      {activeSection === feature.id ? "대시보드 열기" : "자세히 보기"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {activeSection && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="font-serif text-2xl text-slate-900 flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center">
                  {(() => {
                    const activeFeature = mainFeatures.find((f) => f.id === activeSection)
                    return activeFeature ? <activeFeature.icon className="h-4 w-4 text-white" /> : null
                  })()}
                </div>
                {mainFeatures.find((f) => f.id === activeSection)?.title} 상세 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeSection === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {["프로젝트 개요", "연구진 및 투입시간", "재료비 상세내역", "외주비 상세내역"].map((item, index) => (
                    <Card
                      key={index}
                      className="p-6 hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 border-slate-200 bg-white"
                    >
                      <div className="text-center">
                        <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="h-6 w-6 text-slate-600" />
                        </div>
                        <p className="font-medium text-slate-800">{item}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeSection === "tax-credits" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: "국가전략 프로젝트", count: 8, amount: "₩5.2억", color: "bg-slate-600" },
                    { name: "신성장원천기술", count: 12, amount: "₩6.4억", color: "bg-slate-700" },
                    { name: "일반 프로젝트", count: 4, amount: "₩1.6억", color: "bg-slate-800" },
                  ].map((category, index) => (
                    <Card
                      key={index}
                      className="p-8 hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`h-5 w-5 ${category.color} rounded-full`}></div>
                        <h3 className="font-semibold text-slate-800">{category.name}</h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-3xl font-bold text-slate-900">{category.amount}</p>
                        <p className="text-slate-600">{category.count}개 프로젝트</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeSection === "labor-costs" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "총 연구원", value: "48명", icon: Users },
                    { label: "총 투입시간", value: "3,690시간", icon: BarChart3 }, // 평균 투입시간을 총 투입시간으로 변경
                    { label: "부서 수", value: "6개", icon: Calculator }, // 활성 프로젝트를 부서 수로 변경
                    { label: "프로젝트 배정률", value: "94%", icon: TrendingUp }, // 프로젝트 참여율을 프로젝트 배정률로 변경
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 bg-white"
                    >
                      <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-6 w-6 text-slate-600" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</p>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  FileText,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useCurrency } from "@/lib/currency-context";
import { useState } from "react";

const mockEvidences = [
  {
    id: 1,
    title: "AI 모델 개발 계획서",
    type: "계획서",
    uploader: "김연구",
    uploadDate: "2024-01-15",
    status: "검증",
    linkedTimeEntries: [{ date: "2024-01-15", hours: 8 }],
    tags: ["AI", "계획"],
    fileType: "PDF",
  },
  {
    id: 2,
    title: "GPU 서버 구매 증빙",
    type: "구매증빙",
    uploader: "박데이터",
    uploadDate: "2024-02-01",
    status: "제출",
    linkedTimeEntries: [],
    tags: ["하드웨어", "구매"],
    fileType: "PDF",
  },
  {
    id: 3,
    title: "1차 연구 보고서",
    type: "보고서",
    uploader: "이AI",
    uploadDate: "2024-03-15",
    status: "반려",
    linkedTimeEntries: [{ date: "2024-03-15", hours: 6 }],
    tags: ["보고서", "1차"],
    fileType: "PDF",
  },
  {
    id: 4,
    title: "데이터셋 라이센스 계약서",
    type: "계약서",
    uploader: "최개발",
    uploadDate: "2024-02-20",
    status: "검증",
    linkedTimeEntries: [{ date: "2024-02-20", hours: 4 }],
    tags: ["계약", "데이터"],
    fileType: "PDF",
  },
  {
    id: 5,
    title: "연구 노트 - 모델 성능 테스트",
    type: "연구노트",
    uploader: "한테스트",
    uploadDate: "2024-03-01",
    status: "제출",
    linkedTimeEntries: [],
    tags: ["테스트", "성능"],
    fileType: "PDF",
  },
];

const mockTimeEntries = [
  {
    id: 1,
    date: "2024-01-15",
    user: "김연구",
    task: "프로젝트 계획 수립",
    hours: 8,
  },
  { id: 2, date: "2024-01-16", user: "이AI", task: "AI 모델 설계", hours: 6 },
  {
    id: 3,
    date: "2024-02-01",
    user: "박데이터",
    task: "데이터 전처리",
    hours: 7,
  },
  { id: 4, date: "2024-02-20", user: "최개발", task: "백엔드 개발", hours: 8 },
  {
    id: 5,
    date: "2024-03-01",
    user: "한테스트",
    task: "성능 테스트",
    hours: 6,
  },
  { id: 6, date: "2024-03-15", user: "이AI", task: "보고서 작성", hours: 4 },
];

const mockProjectDetails = {
  1: {
    id: 1,
    name: "AI 기반 의료진단 시스템",
    type: "국가전략",
    status: "진행중",
    progress: 75,
    budget: "2.4",
    spent: "1.8",
    remaining: "0.6",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    teamSize: 8,
    manager: "김연구",
    description:
      "딥러닝 기술을 활용한 의료 영상 진단 시스템 개발로 진단 정확도 향상 및 의료진 업무 효율성 증대",
    objectives: [
      "의료 영상 분석 AI 모델 개발",
      "실시간 진단 시스템 구축",
      "의료진 워크플로우 통합",
      "임상 검증 및 성능 평가",
    ],
    team: [
      { name: "김연구", role: "프로젝트 매니저", hours: 160 },
      { name: "이AI", role: "AI 연구원", hours: 180 },
      { name: "박데이터", role: "데이터 사이언티스트", hours: 170 },
      { name: "최개발", role: "백엔드 개발자", hours: 160 },
      { name: "정프론트", role: "프론트엔드 개발자", hours: 150 },
      { name: "한테스트", role: "QA 엔지니어", hours: 140 },
      { name: "윤디자인", role: "UI/UX 디자이너", hours: 120 },
      { name: "조의료", role: "의료 자문", hours: 80 },
    ],
    materials: [
      {
        category: "하드웨어",
        item: "GPU 서버 (RTX 4090 x4)",
        quantity: 2,
        unitPrice: "0.4",
        total: "0.8",
      },
      {
        category: "소프트웨어",
        item: "CUDA 라이센스",
        quantity: 4,
        unitPrice: "0.05",
        total: "0.2",
      },
      {
        category: "데이터",
        item: "의료 영상 데이터셋",
        quantity: 1,
        unitPrice: "0.15",
        total: "0.15",
      },
      {
        category: "장비",
        item: "워크스테이션",
        quantity: 8,
        unitPrice: "0.075",
        total: "0.6",
      },
    ],
    outsourcing: [
      {
        vendor: "메디컬AI",
        service: "의료 영상 전처리",
        amount: "0.4",
        period: "3개월",
        status: "진행중",
      },
      {
        vendor: "클라우드텍",
        service: "클라우드 인프라",
        amount: "0.2",
        period: "12개월",
        status: "완료",
      },
      {
        vendor: "데이터랩",
        service: "데이터 라벨링",
        amount: "0.3",
        period: "2개월",
        status: "완료",
      },
    ],
  },
};

const mockLaborCosts = [
  {
    id: 1,
    date: "2024-01-15",
    researcher: "김연구",
    memo: "AI 모델 알고리즘 개발",
    hours: 8,
    projectRatio: 100,
    laborCost: 640000,
    timeReportId: "TR-2024-001",
    researchNoteLink: true,
    evidenceFile: "timesheet_20240115.pdf",
    matchStatus: "일치",
  },
  {
    id: 2,
    date: "2024-01-16",
    researcher: "이개발",
    memo: "데이터 전처리 작업",
    hours: 6,
    projectRatio: 80,
    laborCost: 384000,
    timeReportId: "TR-2024-002",
    researchNoteLink: true,
    evidenceFile: "timesheet_20240116.pdf",
    matchStatus: "불일치",
  },
  {
    id: 3,
    date: "2024-01-17",
    researcher: "박분석",
    memo: "모델 성능 평가",
    hours: 7,
    projectRatio: 90,
    laborCost: 504000,
    timeReportId: "TR-2024-003",
    researchNoteLink: false,
    evidenceFile: null,
    matchStatus: "미연결",
  },
];

const mockMaterialCosts = [
  {
    id: 1,
    purchaseDate: "2024-01-10",
    item: "GPU 서버 / RTX 4090 24GB",
    quantity: 2,
    unitPrice: 2500000,
    amount: 5000000,
    orderNumber: "PO-2024-001",
    supplier: "테크솔루션",
    evidenceFile: "invoice_20240110.pdf",
    qualified: true,
  },
  {
    id: 2,
    purchaseDate: "2024-01-12",
    item: "메모리 모듈 / DDR5 64GB",
    quantity: 4,
    unitPrice: 800000,
    amount: 3200000,
    orderNumber: "PO-2024-002",
    supplier: "하드웨어마트",
    evidenceFile: "invoice_20240112.pdf",
    qualified: true,
  },
  {
    id: 3,
    purchaseDate: "2024-01-15",
    item: "SSD 스토리지 / 2TB NVMe",
    quantity: 3,
    unitPrice: 300000,
    amount: 900000,
    orderNumber: "PO-2024-003",
    supplier: "스토리지코리아",
    evidenceFile: null,
    qualified: false,
  },
];

const mockOutsourcingCosts = [
  {
    id: 1,
    contractNumber: "OS-2024-001",
    vendor: "데이터랩",
    workPeriod: "2024-01-01 ~ 2024-02-29",
    inspectionDate: "2024-02-28",
    amount: 15000000,
    taxInvoice: "TI-2024-001",
    deliverableLink: "https://drive.google.com/deliverable1",
    evidenceFile: "contract_20240101.pdf",
    status: "검수완료",
  },
  {
    id: 2,
    contractNumber: "OS-2024-002",
    vendor: "AI솔루션",
    workPeriod: "2024-02-01 ~ 2024-03-31",
    inspectionDate: null,
    amount: 8000000,
    taxInvoice: "TI-2024-002",
    deliverableLink: null,
    evidenceFile: "contract_20240201.pdf",
    status: "진행중",
  },
  {
    id: 3,
    contractNumber: "OS-2024-003",
    vendor: "클라우드서비스",
    workPeriod: "2024-01-15 ~ 2024-04-15",
    inspectionDate: "2024-04-10",
    amount: 12000000,
    taxInvoice: null,
    taxInvoice: "TI-2024-003",
    deliverableLink: "https://drive.google.com/deliverable3",
    evidenceFile: null,
    status: "보완요청",
  },
];

const mockResearchNotes = [
  {
    id: 1,
    researcher: "김연구",
    week: "2025년 1주차 (1/6-1/12)",
    hours: 40,
    researchContent: "AI 모델 알고리즘 개발 및 성능 최적화",
    noteFile: "research_note_week1.pdf",
    status: "첨부완료",
  },
  {
    id: 2,
    researcher: "이개발",
    week: "2025년 1주차 (1/6-1/12)",
    hours: 35,
    researchContent: "데이터 전처리 및 특성 추출 작업",
    noteFile: "data_preprocessing_week1.pdf",
    status: "검토중",
  },
  {
    id: 3,
    researcher: "박분석",
    week: "2025년 1주차 (1/6-1/12)",
    hours: 38,
    researchContent: "모델 성능 평가 및 결과 분석",
    noteFile: "-",
    status: "업로드 필요",
  },
  {
    id: 4,
    researcher: "김연구",
    week: "2025년 2주차 (1/13-1/19)",
    hours: 42,
    researchContent: "알고리즘 개선 및 테스트 케이스 작성",
    noteFile: "research_note_week2.pdf",
    status: "첨부완료",
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = Number.parseInt(params.id as string);
  const project =
    mockProjectDetails[projectId as keyof typeof mockProjectDetails];
  const fromPage = searchParams.get("from");
  const backUrl = fromPage === "tax-credits" ? "/tax-credits" : "/projects";
  const backLabel =
    fromPage === "tax-credits" ? "세액공제 현황" : "프로젝트 목록";

  const { unit, setUnit, formatAmount } = useCurrency();

  const [evidences, setEvidences] = useState(mockEvidences);
  const [selectedEvidences, setSelectedEvidences] = useState<number[]>([]);
  const [evidenceFilters, setEvidenceFilters] = useState({
    period: "",
    type: "전체",
    uploader: "전체",
    status: "전체",
    showUnlinkedOnly: false,
  });
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isTimeEntryModalOpen, setIsTimeEntryModalOpen] = useState(false);
  const [selectedTimeEntries, setSelectedTimeEntries] = useState<number[]>([]);
  const [selectedLaborItem, setSelectedLaborItem] = useState(null);
  const [selectedMaterialItem, setSelectedMaterialItem] = useState(null);
  const [selectedOutsourcingItem, setSelectedOutsourcingItem] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [activeEvidenceTab, setActiveEvidenceTab] = useState("labor");

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground mb-4">
              프로젝트를 찾을 수 없습니다.
            </p>
            <Link href="/projects">
              <Button>프로젝트 목록으로</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "검증":
        return "bg-green-100 text-green-800";
      case "제출":
        return "bg-blue-100 text-blue-800";
      case "반려":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor2 = (type: string) => {
    const colors = {
      계획서: "bg-blue-100 text-blue-800",
      보고서: "bg-green-100 text-green-800",
      연구노트: "bg-purple-100 text-purple-800",
      구매증빙: "bg-orange-100 text-orange-800",
      계약서: "bg-red-100 text-red-800",
      ERP전표: "bg-yellow-100 text-yellow-800",
      회의록: "bg-indigo-100 text-indigo-800",
      테스트결과: "bg-pink-100 text-pink-800",
      기타: "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || colors["기타"];
  };

  const filteredEvidences = evidences.filter((evidence) => {
    if (
      evidenceFilters.type !== "전체" &&
      evidence.type !== evidenceFilters.type
    )
      return false;
    if (
      evidenceFilters.uploader !== "전체" &&
      evidence.uploader !== evidenceFilters.uploader
    )
      return false;
    if (
      evidenceFilters.status !== "전체" &&
      evidenceFilters.status !== evidence.status
    )
      return false;
    if (
      evidenceFilters.showUnlinkedOnly &&
      evidence.linkedTimeEntries.length > 0
    )
      return false;
    return true;
  });

  const totalEvidences = evidences.length;
  const verifiedEvidences = evidences.filter((e) => e.status === "검증").length;
  const linkedEvidences = evidences.filter(
    (e) => e.linkedTimeEntries.length > 0
  ).length;
  const verificationRate =
    totalEvidences > 0
      ? Math.round((verifiedEvidences / totalEvidences) * 100)
      : 0;
  const linkageRate =
    totalEvidences > 0
      ? Math.round((linkedEvidences / totalEvidences) * 100)
      : 0;

  const handleEvidenceSelect = (evidenceId: number) => {
    setSelectedEvidences((prev) =>
      prev.includes(evidenceId)
        ? prev.filter((id) => id !== evidenceId)
        : [...prev, evidenceId]
    );
  };

  const handleTimeEntryLink = () => {
    // Link selected evidences to selected time entries
    const updatedEvidences = evidences.map((evidence) => {
      if (selectedEvidences.includes(evidence.id)) {
        const newTimeEntries = selectedTimeEntries
          .map((teId) => {
            const timeEntry = mockTimeEntries.find((te) => te.id === teId);
            return timeEntry
              ? { date: timeEntry.date, hours: timeEntry.hours }
              : null;
          })
          .filter(Boolean);

        return {
          ...evidence,
          linkedTimeEntries: [...evidence.linkedTimeEntries, ...newTimeEntries],
        };
      }
      return evidence;
    });

    setEvidences(updatedEvidences);
    setSelectedEvidences([]);
    setSelectedTimeEntries([]);
    setIsTimeEntryModalOpen(false);
  };

  const handleStatusChange = (evidenceId: number, newStatus: string) => {
    setEvidences((prev) =>
      prev.map((evidence) =>
        evidence.id === evidenceId
          ? { ...evidence, status: newStatus }
          : evidence
      )
    );
  };

  const exportTaxPackage = () => {
    const csvContent = [
      [
        "제목",
        "유형",
        "업로더",
        "업로드일",
        "상태",
        "연결된 타임엔트리",
        "태그",
      ].join(","),
      ...filteredEvidences.map((evidence) =>
        [
          evidence.title,
          evidence.type,
          evidence.uploader,
          evidence.uploadDate,
          evidence.status,
          evidence.linkedTimeEntries
            .map((te) => `${te.date}(${te.hours}h)`)
            .join(";"),
          evidence.tags.join(";"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name}_증빙자료_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalMaterialCost = project.materials.reduce(
    (sum, item) => sum + Number.parseFloat(item.total),
    0
  );
  const totalOutsourcingCost = project.outsourcing.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount),
    0
  );

  const generateReport = () => {
    const reportContent = `
프로젝트 종합 보고서
=====================

프로젝트명: ${project.name}
프로젝트 유형: ${project.type}
진행 상태: ${project.status}
진행률: ${project.progress}%

프로젝트 개요
-----------
${project.description}

프로젝트 목표:
${project.objectives.map((obj, i) => `${i + 1}. ${obj}`).join("\n")}

프로젝트 정보
-----------
시작일: ${project.startDate}
종료일: ${project.endDate}
총 예산: ${formatAmount(project.budget)}
사용액: ${formatAmount(project.spent)}
잔여 예산: ${formatAmount(project.remaining)}

연구진 현황
---------
${project.team
  .map((member) => `${member.name} (${member.role}) - ${member.hours}시간`)
  .join("\n")}

재료비 내역
---------
${project.materials
  .map(
    (material) =>
      `${material.category}: ${material.item} - ${formatAmount(material.total)}`
  )
  .join("\n")}
재료비 총액: ${formatAmount(totalMaterialCost.toString())}

외주비 내역
---------
${project.outsourcing
  .map(
    (contract) =>
      `${contract.vendor}: ${contract.service} - ${formatAmount(
        contract.amount
      )} (${contract.status})`
  )
  .join("\n")}
외주비 총액: ${formatAmount(totalOutsourcingCost.toString())}
    `.trim();

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name}_종합보고서.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${project.name} - 종합 보고서</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #666; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .badge { background: #e5e5e5; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            .progress { background: #f0f0f0; height: 20px; border-radius: 10px; overflow: hidden; }
            .progress-bar { background: #4CAF50; height: 100%; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>${project.name} - 종합 보고서</h1>
          
          <div style="display: flex; gap: 20px; margin: 20px 0;">
            <div><strong>프로젝트 유형:</strong> <span class="badge">${
              project.type
            }</span></div>
            <div><strong>상태:</strong> <span class="badge">${
              project.status
            }</span></div>
            <div><strong>진행률:</strong> ${project.progress}%</div>
          </div>
          
          <div class="progress" style="margin: 10px 0;">
            <div class="progress-bar" style="width: ${project.progress}%"></div>
          </div>

          <h2>프로젝트 개요</h2>
          <p>${project.description}</p>
          
          <h3>프로젝트 목표</h3>
          <ul>
            ${project.objectives.map((obj) => `<li>${obj}</li>`).join("")}
          </ul>

          <h2>프로젝트 정보</h2>
          <table>
            <tr><td><strong>시작일</strong></td><td>${
              project.startDate
            }</td></tr>
            <tr><td><strong>종료일</strong></td><td>${project.endDate}</td></tr>
            <tr><td><strong>총 예산</strong></td><td>${formatAmount(
              project.budget
            )}</td></tr>
            <tr><td><strong>사용액</strong></td><td>${formatAmount(
              project.spent
            )}</td></tr>
            <tr><td><strong>잔여 예산</strong></td><td>${formatAmount(
              project.remaining
            )}</td></tr>
          </table>

          <h2>연구진 현황</h2>
          <table>
            <thead>
              <tr><th>이름</th><th>역할</th><th>월 투입시간</th></tr>
            </thead>
            <tbody>
              ${project.team
                .map(
                  (member) => `
                <tr>
                  <td>${member.name}</td>
                  <td>${member.role}</td>
                  <td>${member.hours}시간</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <h2>재료비 상세내역</h2>
          <table>
            <thead>
              <tr><th>카테고리</th><th>품목</th><th>수량</th><th>단가</th><th>총액</th></tr>
            </thead>
            <tbody>
              ${project.materials
                .map(
                  (material) => `
                <tr>
                  <td>${material.category}</td>
                  <td>${material.item}</td>
                  <td>${material.quantity}</td>
                  <td>${formatAmount(material.unitPrice)}</td>
                  <td>${formatAmount(material.total)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p><strong>재료비 총액: ${formatAmount(
            totalMaterialCost.toString()
          )}</strong></p>

          <h2>외주비 상세내역</h2>
          <table>
            <thead>
              <tr><th>업체명</th><th>서비스</th><th>금액</th><th>기간</th><th>상태</th></tr>
            </thead>
            <tbody>
              ${project.outsourcing
                .map(
                  (contract) => `
                <tr>
                  <td>${contract.vendor}</td>
                  <td>${contract.service}</td>
                  <td>${formatAmount(contract.amount)}</td>
                  <td>${contract.period}</td>
                  <td>${contract.status}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p><strong>외주비 총액: ${formatAmount(
            totalOutsourcingCost.toString()
          )}</strong></p>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={backUrl}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-serif font-bold text-foreground">
                  {project.name}
                </h1>
                <Badge className={`${getTypeColor(project.type)}`}>
                  {project.type}
                </Badge>
                <Badge variant="outline">{project.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
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
              <Button onClick={printReport} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                인쇄용 보고서
              </Button>
              <Button onClick={generateReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                보고서 다운로드
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    진행률
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {project.progress}%
                  </p>
                  <Progress value={project.progress} className="mt-2" />
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
                    {formatAmount(project.budget)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    잔여: {formatAmount(project.remaining)}
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
                    {formatAmount(project.spent)}
                  </p>
                  <p className="text-sm text-accent">총 집행 금액</p>
                </div>
                <Calendar className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-200 text-black">
            <TabsTrigger value="overview">프로젝트 개요</TabsTrigger>
            <TabsTrigger value="team">연구진 및 투입시간</TabsTrigger>
            <TabsTrigger value="materials">재료비 상세내역</TabsTrigger>
            <TabsTrigger value="outsourcing">외주비 상세내역</TabsTrigger>
            <TabsTrigger value="evidence">증빙</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">프로젝트 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">프로젝트 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">시작일</p>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">종료일</p>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        프로젝트 유형
                      </p>
                      <Badge className={`${getTypeColor(project.type)} mt-1`}>
                        {project.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">현재 상태</p>
                      <Badge variant="outline" className="mt-1">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">연구진 및 투입시간</CardTitle>
                <CardDescription>프로젝트 참여 연구원 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">이름</th>
                        <th className="text-left py-3 px-4">역할</th>
                        <th className="text-right py-3 px-4">월 투입시간</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.team.map((member, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">
                            {member.name}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {member.role}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {member.hours}시간
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">재료비 상세내역</CardTitle>
                <CardDescription>
                  장비, 소프트웨어 및 기타 재료 구매 내역
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">카테고리</th>
                        <th className="text-left py-3 px-4">품목</th>
                        <th className="text-right py-3 px-4">수량</th>
                        <th className="text-right py-3 px-4">단가</th>
                        <th className="text-right py-3 px-4">총액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.materials.map((material, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <Badge variant="outline">{material.category}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {material.item}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {material.quantity}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {formatAmount(material.unitPrice)}
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {formatAmount(material.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outsourcing">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">외주비 상세내역</CardTitle>
                <CardDescription>
                  외부 업체 용역 및 서비스 계약 현황
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.outsourcing.map((contract, index) => (
                    <Card key={index} className="border-l-4 border-l-accent">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">
                              {contract.vendor}
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {contract.service}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{formatAmount(contract.amount)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{contract.period}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              contract.status === "완료"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {contract.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence">
            <div className="flex gap-6 h-[800px]">
              {/* 좌측 세로 탭 */}
              <div className="w-[220px] flex-shrink-0">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveEvidenceTab("labor")}
                    className={`w-full px-4 py-3 rounded-full text-left transition-all ${
                      activeEvidenceTab === "labor"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    인건비
                  </button>
                  <button
                    onClick={() => setActiveEvidenceTab("materials")}
                    className={`w-full px-4 py-3 rounded-full text-left transition-all ${
                      activeEvidenceTab === "materials"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    재료비
                  </button>
                  <button
                    onClick={() => setActiveEvidenceTab("outsourcing")}
                    className={`w-full px-4 py-3 rounded-full text-left transition-all ${
                      activeEvidenceTab === "outsourcing"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    외주비
                  </button>
                </div>
              </div>

              {/* 우측 콘텐츠 패널 */}
              <div className="flex-1 overflow-hidden">
                <Card className="h-full rounded-2xl shadow-sm">
                  <CardContent className="p-6 h-full overflow-auto">
                    {/* 인건비 탭 */}
                    {activeEvidenceTab === "labor" && (
                      <div className="space-y-6">
                        {/* 상단 액션 바 */}
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            연구 노트 첨부
                          </h3>
                          <div className="flex gap-2">
                            <Input
                              placeholder="연구원 검색..."
                              className="w-40 border border-gray-300 shadow-xs"
                            />
                            <Select>
                              <SelectTrigger className="w-32 border border-gray-300 shadow-xs">
                                <SelectValue placeholder="기간" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="month">월별</SelectItem>
                                <SelectItem value="quarter">분기별</SelectItem>
                                <SelectItem value="year">연도별</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              CSV
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              XLSX
                            </Button>
                          </div>
                        </div>

                        {/* 연구 노트 테이블 */}
                        <div className="border rounded-xl overflow-hidden">
                          <div>
                            <table>
                              <thead className="bg-muted/50 sticky top-0">
                                <tr>
                                  <th className="text-left text-sm font-semibold p-3 w-32">
                                    연구원
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    주(Week)
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3 w-24">
                                    시간
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    연구 내용
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    연구 노트
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    첨부 상태
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {mockResearchNotes.map((note) => (
                                  <tr
                                    key={note.id}
                                    className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                                    onClick={() => setIsDetailPanelOpen(true)}
                                  >
                                    <td className="p-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                          <span className="text-sm font-medium">
                                            {note.researcher.charAt(0)}
                                          </span>
                                        </div>
                                        <span>{note.researcher}</span>
                                      </div>
                                    </td>
                                    <td className="p-3">{note.week}</td>
                                    <td className="p-3">{note.hours}시간</td>
                                    <td className="p-3">
                                      {note.researchContent}
                                    </td>
                                    <td className="p-3">{note.noteFile}</td>
                                    <td className="p-3">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant={
                                            note.status === "첨부완료"
                                              ? "default"
                                              : note.status === "검토중"
                                              ? "secondary"
                                              : "destructive"
                                          }
                                          className="text-xs"
                                        >
                                          {note.status === "첨부완료" &&
                                            "✅ 첨부완료"}
                                          {note.status === "검토중" &&
                                            "📄 검토중"}
                                          {note.status === "업로드 필요" &&
                                            "⚠️ 업로드 필요"}
                                        </Badge>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot className="bg-muted/30 border-t-2">
                                <tr>
                                  <td className="p-3 font-semibold">합계</td>
                                  <td className="p-3 font-semibold">4주차</td>
                                  <td className="p-3 font-semibold">155시간</td>
                                  <td className="p-3 font-semibold">-</td>
                                  <td className="p-3 font-semibold">
                                    3개 파일
                                  </td>
                                  <td className="p-3 font-semibold">
                                    <div className="flex gap-1">
                                      <Badge
                                        variant="default"
                                        className="text-xs"
                                      >
                                        완료 2
                                      </Badge>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        검토 1
                                      </Badge>
                                      <Badge
                                        variant="destructive"
                                        className="text-xs"
                                      >
                                        대기 1
                                      </Badge>
                                    </div>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 재료비 탭 */}
                    {activeEvidenceTab === "materials" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">재료비 증빙</h3>
                          <div className="flex gap-2">
                            <Input
                              placeholder="품목/거래처 검색..."
                              className="w-40"
                            />
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="기간" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="month">월별</SelectItem>
                                <SelectItem value="quarter">분기별</SelectItem>
                                <SelectItem value="year">연도별</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              CSV
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              XLSX
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-muted/50 sticky top-0">
                                <tr>
                                  <th className="text-left text-sm font-semibold p-3">
                                    품목명
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    규격/수량
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    단가
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    금액
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    거래처
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    증빙파일
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b hover:bg-muted/30 cursor-pointer transition-colors">
                                  <td className="p-3">실험용 시약</td>
                                  <td className="p-3">500ml × 10개</td>
                                  <td className="p-3">₩50,000</td>
                                  <td className="p-3">₩500,000</td>
                                  <td className="p-3">화학연구소</td>
                                  <td className="p-3">
                                    <Badge
                                      variant="default"
                                      className="text-xs"
                                    >
                                      📄 영수증
                                    </Badge>
                                  </td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30 cursor-pointer transition-colors">
                                  <td className="p-3">측정장비</td>
                                  <td className="p-3">1대</td>
                                  <td className="p-3">₩2,000,000</td>
                                  <td className="p-3">₩2,000,000</td>
                                  <td className="p-3">정밀기기</td>
                                  <td className="p-3">
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      ⬆ 누락
                                    </Badge>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot className="bg-muted/30 font-semibold">
                                <tr>
                                  <td className="p-3">합계</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">₩2,500,000</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">-</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 외주비 탭 */}
                    {activeEvidenceTab === "outsourcing" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">외주비 증빙</h3>
                          <div className="flex gap-2">
                            <Input
                              placeholder="용역명/공급업체 검색..."
                              className="w-40"
                            />
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="기간" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="month">월별</SelectItem>
                                <SelectItem value="quarter">분기별</SelectItem>
                                <SelectItem value="year">연도별</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              CSV
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              XLSX
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-muted/50 sticky top-0">
                                <tr>
                                  <th className="text-left text-sm font-semibold p-3">
                                    용역명
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    계약기간
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    진행률
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    금액
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    공급업체
                                  </th>
                                  <th className="text-left text-sm font-semibold p-3">
                                    증빙파일
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b hover:bg-muted/30 cursor-pointer transition-colors">
                                  <td className="p-3">데이터 분석 용역</td>
                                  <td className="p-3">2025.01-2025.06</td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-gray-500 h-2 rounded-full"
                                          style={{ width: "30%" }}
                                        ></div>
                                      </div>
                                      <span className="text-sm">30%</span>
                                    </div>
                                  </td>
                                  <td className="p-3">₩5,000,000</td>
                                  <td className="p-3">데이터솔루션</td>
                                  <td className="p-3">
                                    <Badge
                                      variant="default"
                                      className="text-xs"
                                    >
                                      ✅ 검토완료
                                    </Badge>
                                  </td>
                                </tr>
                                <tr className="border-b hover:bg-muted/30 cursor-pointer transition-colors">
                                  <td className="p-3">시스템 개발</td>
                                  <td className="p-3">2025.03-2025.12</td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-green-500 h-2 rounded-full"
                                          style={{ width: "85%" }}
                                        ></div>
                                      </div>
                                      <span className="text-sm">85%</span>
                                    </div>
                                  </td>
                                  <td className="p-3">₩15,000,000</td>
                                  <td className="p-3">테크솔루션</td>
                                  <td className="p-3">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      📄 미확인
                                    </Badge>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot className="bg-muted/30 font-semibold">
                                <tr>
                                  <td className="p-3">합계</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">₩20,000,000</td>
                                  <td className="p-3">-</td>
                                  <td className="p-3">-</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 우측 슬라이드 패널 */}
            {isDetailPanelOpen && (
              <div className="fixed inset-y-0 right-0 w-96 bg-background border-l shadow-lg z-50 overflow-auto">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">연구노트 상세</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDetailPanelOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>연구원</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        김연구
                      </p>
                    </div>
                    <div>
                      <Label>연구 기간</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        2025년 1주차 (1/6-1/12)
                      </p>
                    </div>
                    <div>
                      <Label>투입 시간</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        40시간
                      </p>
                    </div>
                    <div>
                      <Label>연구 내용</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI 모델 알고리즘 개발 및 성능 최적화
                      </p>
                    </div>
                    <div>
                      <Label>코멘트</Label>
                      <textarea
                        className="w-full mt-1 p-2 border rounded"
                        rows={3}
                        placeholder="연구노트에 대한 메모를 입력하세요..."
                      ></textarea>
                    </div>
                    <div>
                      <Label>연구노트 파일</Label>
                      <div className="mt-1 p-4 border-2 border-dashed rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">
                          연구노트 파일을 드래그하거나 클릭하여 업로드
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        파일 업로드
                      </Button>
                      <Button variant="outline" size="sm">
                        검토완료 표시
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

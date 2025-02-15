import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard";
import AddSkill from "./sub-components/AddSkill";
import AddProject from "./sub-components/AddProject";
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
import Account from "./sub-components/Account";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Messages from "./sub-components/Messages";
import AddTimeline from "./sub-components/AddTimeline";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-16 flex-col border-r bg-white shadow-lg sm:flex z-50">
        <nav className="flex flex-col items-center gap-6 px-2 pt-6">
          <Link className="group flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-lg font-semibold">
            <Package2 className="h-5 w-5" />
          </Link>

          {[{ icon: Home, label: "Dashboard" },
            { icon: FolderGit, label: "Add Project" },
            { icon: PencilRuler, label: "Add Skill" },
            { icon: LayoutGrid, label: "Add Uses" },
            { icon: History, label: "Add Timeline" },
            { icon: MessageSquareMore, label: "Messages" },
            { icon: User, label: "Account" }].map(({ icon: Icon, label }) => (
            <TooltipProvider key={label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      active === label
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                    onClick={() => setActive(label)}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        {/* Logout */}
        <div className="mt-auto flex flex-col items-center pb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm sm:static">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-4 text-lg font-medium">
              {["Dashboard", "Add Project", "Add Skill", "Add Uses", "Add Timeline", "Messages", "Account"].map((label) => (
                <Link
                  key={label}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    active === label ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActive(label)}
                >
                  {label}
                </Link>
              ))}
              <Link
                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4">
          {user?.avatar?.url && (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
          )}
          <h1 className="text-lg font-semibold">Welcome back, {user?.fullName}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        {
          (() => {
            switch (active) {
              case "Dashboard":
                return <Dashboard />;
              case "Add Project":
                return <AddProject />;
              case "Add Skill":
                return <AddSkill />;
              case "Add Uses":
                return <AddSoftwareApplications />;
              case "Add Timeline":
                return <AddTimeline />;
              case "Messages":
                return <Messages />;
              case "Account":
                return <Account />;
              default:
                return <Dashboard />;
            }
          })()
        }
      </main>
    </div>
  );
};

export default HomePage;

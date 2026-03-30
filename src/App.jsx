import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/variables.css";
import "./components/shared-ui.css";
import "./styles/animations.css";
import "./pages/curated.css";
import "./styles/home.css";
import CuratedShell from "./pages/CuratedShell";
import ArchivePage from "./pages/ArchivePage";
import BookingCompletePage from "./pages/BookingCompletePage";
import CatalogPage from "./pages/CatalogPage";
import CheckoutPage from "./pages/CheckoutPage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import FarmDetailPage from "./pages/FarmDetailPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import InquiriesPage from "./pages/InquiriesPage";
import PolicyPage from "./pages/PolicyPage";
import ReservationsPage from "./pages/ReservationsPage";
import SupportPage from "./pages/SupportPage";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<ChatPage />} path="/chat" />
      <Route element={<CuratedShell />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<CatalogPage />} path="/villages" />
        <Route
          element={<ExperienceDetailPage collectionType="villages" />}
          path="/villages/:slug"
        />
        <Route element={<FarmDetailPage />} path="/farms/:slug" />
        <Route
          element={<CheckoutPage />}
          path="/checkout/:collectionType/:slug"
        />
        <Route element={<BookingCompletePage />} path="/booking-complete" />
        <Route element={<SupportPage />} path="/support" />
        <Route element={<FaqPage />} path="/support/faq" />
        <Route
          element={<PolicyPage policyKey="refund" />}
          path="/support/refund"
        />
        <Route
          element={<PolicyPage policyKey="privacy" />}
          path="/support/privacy"
        />
        <Route element={<ReservationsPage />} path="/my/reservations" />
        <Route element={<InquiriesPage />} path="/my/inquiries" />
        <Route element={<ArchivePage />} path="/archive" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;

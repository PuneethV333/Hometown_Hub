/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Spinner from "../components/Spinner";
import { Auth } from "../config/firebase.config";
import { useGetMe } from "../Hooks/useGetMe";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onBoardingSchema,
  type onBoardingReqBodyType,
} from "../types/user.types";
import { useOnBoarding } from "../Hooks/useOnboarding";
import toast from "react-hot-toast";
import {
  useFetchCities,
  useFetchState,
  useFetchTowns,
} from "../Hooks/useHelpers";

const GENDERS = ["Male", "Female"];

const Onboarding = () => {
  const navigate = useNavigate();
  const authData = Auth.currentUser;
  const { data: user, isPending } = useGetMe();
  const { mutate: onBoarding, isPending: onBoardingLoading } = useOnBoarding();
  const {
    mutate: getStates,
    data: statesData,
    isPending: loadingStates,
  } = useFetchState();
  const {
    mutate: getCities,
    data: citiesData,
    isPending: loadingCities,
  } = useFetchCities();
  const {
    mutate: getTowns,
    data: townData,
    isPending: loadingTown,
  } = useFetchTowns();

  const [onBoardingReqBody, setOnBoardingReqBody] =
    useState<onBoardingReqBodyType>({
      email: authData?.email ?? "",
      name: authData?.displayName ?? "",
      phoneNumber: authData?.phoneNumber ?? "",
      gender: "",
      city: "",
      state: "",
      town: "",
      dob: new Date(),
    });

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (onBoardingReqBody.state) {
      getCities(onBoardingReqBody.state);
    }
  }, [onBoardingReqBody.state]);

  useEffect(() => {
    if (onBoardingReqBody.city) {
      getTowns(onBoardingReqBody.city);
    }
  }, [onBoardingReqBody.city]);

  if (isPending || onBoardingLoading || loadingStates) {
    return <Spinner />;
  }

  if (user?.isProfileComplete) {
    navigate("/home");
  }

  const handleInputChange = (
    field: keyof onBoardingReqBodyType,
    value: string | Date,
  ) => {
    setOnBoardingReqBody((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStateChange = (state: string) => {
    setOnBoardingReqBody((prev) => ({
      ...prev,
      state,
      city: "",
      town: "",
    }));
  };

  const handleCityChange = (city: string) => {
    setOnBoardingReqBody((prev) => ({
      ...prev,
      city,
      town: "",
    }));
  };

  const handleOnBoarding = async () => {
    try {
      const result = onBoardingSchema.safeParse(onBoardingReqBody);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        const firstError =
          errors.email?.[0] ||
          errors.name?.[0] ||
          errors.phoneNumber?.[0] ||
          errors.gender?.[0] ||
          errors.city?.[0] ||
          errors.state?.[0] ||
          errors.town?.[0] ||
          errors.dob?.[0] ||
          "Invalid inputs";

        toast.error(firstError);
        return;
      }

      await onBoarding(result.data);
      toast.success("Profile completed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete onboarding");
    }
  };

  const states = Array.isArray(statesData?.data?.states)
    ? statesData?.data?.states
    : [];
  const cities = Array.isArray(citiesData?.data) ? citiesData?.data : [];
  const towns = Array.isArray(townData?.features) ? townData.features : [];

  const SELECT_STYLE = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237b7a9a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "32px",
  } as const;

  const INPUT_CLASS =
    "w-full bg-[#0d0d12] border border-[#2a2a38] rounded-[10px] px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors";
  const SELECT_CLASS =
    INPUT_CLASS +
    " cursor-pointer appearance-none disabled:opacity-50 disabled:cursor-not-allowed";
  const LABEL_CLASS = "text-xs font-medium text-[#7b7a9a]";

  return (
    <div className="relative min-h-screen bg-[#0d0d12] flex items-center justify-center px-4 py-12 overflow-hidden font-sans">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-2xl bg-[#13131a] border border-[#2a2a38] rounded-2xl p-8 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-[10px] bg-[#1a1230] border border-[#2a2a38] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="2" fill="#a78bfa" />
              <rect
                x="12"
                y="1"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect
                x="1"
                y="12"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect x="12" y="12" width="9" height="9" rx="2" fill="#a78bfa" />
            </svg>
          </div>
          <span className="text-[20px] font-bold text-[#f0eeff] tracking-tight">
            Hometown-Hub
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f0eeff] tracking-tight mb-1">
            Complete Your Profile
          </h1>
          <p className="text-sm text-[#7b7a9a]">
            Help us get to know you better. This information will help us
            connect you with your community.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Row 1: Email + Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>Email</label>
              <input
                type="email"
                value={onBoardingReqBody.email}
                disabled
                className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-[10px] px-3.5 py-2.5 text-sm text-[#7b7a9a] placeholder:text-[#4a4a62] outline-none cursor-not-allowed opacity-60"
              />
              <p className="text-[10px] text-[#4a4a62]">
                Pre-filled from account
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={onBoardingReqBody.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Row 2: Phone + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={onBoardingReqBody.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>Gender</label>
              <select
                value={onBoardingReqBody.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={SELECT_CLASS}
                style={SELECT_STYLE}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: State + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>State</label>
              <select
                value={onBoardingReqBody.state}
                onChange={(e) => handleStateChange(e.target.value)}
                disabled={loadingStates || states.length === 0}
                className={SELECT_CLASS}
                style={SELECT_STYLE}
              >
                <option value="" disabled>
                  {loadingStates ? "Loading states..." : "Select State"}
                </option>
                {states.map((state: { name: string; state_code: string }) => (
                  <option key={state.state_code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={LABEL_CLASS}>City</label>
              <select
                value={onBoardingReqBody.city}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={
                  !onBoardingReqBody.state ||
                  loadingCities ||
                  cities.length === 0
                }
                className={SELECT_CLASS}
                style={SELECT_STYLE}
              >
                <option value="" disabled>
                  {!onBoardingReqBody.state
                    ? "Select state first"
                    : loadingCities
                      ? "Loading cities..."
                      : "Select City"}
                </option>
                {cities.map((city: string) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Town (full width) */}
          <div className="flex flex-col gap-1.5">
            <label className={LABEL_CLASS}>Town</label>
            <select
              value={onBoardingReqBody.town}
              onChange={(e) => handleInputChange("town", e.target.value)}
              disabled={
                !onBoardingReqBody.city || loadingTown || towns.length === 0
              }
              className={SELECT_CLASS}
              style={SELECT_STYLE}
            >
              <option value="" disabled>
                {!onBoardingReqBody.city
                  ? "Select city first"
                  : loadingTown
                    ? "Loading towns..."
                    : towns.length === 0
                      ? "No towns available"
                      : "Select Town"}
              </option>
              {towns.map((town: any) => (
                <option
                  key={town.properties.place_id}
                  value={town.properties.city || town.properties.name}
                >
                  {town.properties.city || town.properties.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <label className={LABEL_CLASS}>Date of Birth</label>
            <input
              type="date"
              value={
                onBoardingReqBody.dob instanceof Date
                  ? onBoardingReqBody.dob.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const dateValue = e.target.value
                  ? new Date(e.target.value)
                  : new Date();
                handleInputChange("dob", dateValue);
              }}
              className={INPUT_CLASS + " cursor-pointer"}
              style={{ colorScheme: "dark" }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleOnBoarding}
            disabled={onBoardingLoading || loadingCities || loadingTown}
            className="w-full py-3 mt-4 rounded-[10px] text-white text-sm font-semibold tracking-tight cursor-pointer border-0
              bg-linear-to-br from-violet-600 to-violet-800
              shadow-[0_0_24px_rgba(124,58,237,0.35)]
              hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {onBoardingLoading ? "Completing Profile..." : "Complete Profile"} →
          </button>
        </div>

        <p className="text-center text-xs text-[#7b7a9a] mt-6">
          Your profile helps us create personalized community connections for
          you.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;

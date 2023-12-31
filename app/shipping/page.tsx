"use client";
import React, { FormEvent, useState } from "react";
import { Figtree } from "next/font/google";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import ScrollLeft from "../components/scrollLeft";
import ScrollingBar from "../components/scrollingBar";

const figtree = Figtree({
	weight: "900",
	subsets: ["latin"],
});

const figtreeNormal = Figtree({
	weight: "600",
	subsets: ["latin"],
});

const figtreeSevenhunnid = Figtree({
	weight: "700",
	subsets: ["latin"],
});

const Home = () => {
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const storedData = localStorage.getItem("cans");
		localStorage.setItem("cans", JSON.stringify(storedData));
		const cans = storedData ? JSON.parse(storedData) : null;
		const form = event.currentTarget as HTMLFormElement;
		const first = (form.elements.namedItem("first") as HTMLInputElement).value;
		const last = (form.elements.namedItem("last") as HTMLInputElement).value;
		const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const addyOne = (form.elements.namedItem("addyOne") as HTMLInputElement)
			.value;
		const addyTwo = (form.elements.namedItem("addyTwo") as HTMLInputElement)
			.value;
		const city = (form.elements.namedItem("city") as HTMLInputElement).value;
		const state = (form.elements.namedItem("state") as HTMLInputElement).value;
		const zip = (form.elements.namedItem("zip") as HTMLInputElement).value;
		const fullAddy =
			addyOne + addyTwo + ", " + city + ", " + state + ", " + zip;
		const fullName = first + " " + last;

		await addDoc(collection(db, "customers"), {
			address: fullAddy,
			cans: cans,
			email: email,
			name: fullName,
			phone: phone,
		});

		console.log(fullAddy);
		router.push("/legal");
	};

	return (
		<div className="h-[100dvh] flex-col justify-center items-center">
			<div className="flxed bg-darkzestygreen">
				<ScrollingBar />
			</div>
			<div>
				<div
					className={`grad h-[calc(83.333333334dvh)] md:h-[calc(100vh-180px)] ${figtree.className}`}
				>
					<div className="sect">
						<div className="flex flex-col items-center h-[calc(83.333333334dvh)] md:h-[calc(100vh-180px)] overflow-y-scroll">
							<div className="pt-[7.5dvh] pb-[5dvh] flex flex-col">
								<h1 className="flex text-7xl text-center max-w-[75vw] text-white">
									ADD YOUR INFO
								</h1>
							</div>
							<div className={`w-[75vw] text-2xl ${figtreeNormal.className}`}>
								<form
									onSubmit={handleSubmit}
									className="flex flex-col items-center"
								>
									<div className="max-w-[75vw]">
										<input
											id="first"
											name="first"
											required
											placeholder="FIRST NAME"
											className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mr-[12.5px] lg:w-[377.5px] mb-[12.5px] w-[75vw]"
											onKeyPress={(event) => {
												if (event.key === " ") {
													event.preventDefault();
												}
											}}
											onBlur={(event) => {
												const input = event.target;
												const words = input.value.toLowerCase().split(" ");

												for (let i = 0; i < words.length; i++) {
													words[i] =
														words[i].charAt(0).toUpperCase() +
														words[i].slice(1);
												}

												input.value = words.join(" ");
											}}
										></input>
										<input
											id="last"
											name="last"
											required
											placeholder="LAST NAME"
											className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] lg:w-[377.5px] mb-[12.5px] w-[75vw]"
											onKeyPress={(event) => {
												if (event.key === " ") {
													event.preventDefault();
												}
											}}
											onBlur={(event) => {
												const input = event.target;
												const words = input.value.toLowerCase().split(" ");

												for (let i = 0; i < words.length; i++) {
													words[i] =
														words[i].charAt(0).toUpperCase() +
														words[i].slice(1);
												}

												input.value = words.join(" ");
											}}
										></input>
									</div>
									<input
										id="phone"
										name="phone"
										maxLength={10}
										required
										placeholder="(---) --- ----"
										className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mb-[12.5px] w-[75vw] max-w-[770px]"
										onKeyPress={(event) => {
											if (!/[0-9]/.test(event.key)) {
												event.preventDefault();
											}
										}}
									></input>
									<input
										id="email"
										name="email"
										required
										placeholder="EMAIL"
										pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
										onKeyPress={(event) => {
											if (event.key === " ") {
												event.preventDefault();
											}
										}}
										className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mb-[12.5px] w-[75vw] max-w-[770px]"
									></input>
									<input
										id="addyOne"
										name="addyOne"
										required
										placeholder="ADDRESS"
										className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mb-[12.5px] w-[75vw] max-w-[770px]"
										onBlur={(event) => {
											const input = event.target;
											const words = input.value.toLowerCase().split(" ");

											for (let i = 0; i < words.length; i++) {
												words[i] =
													words[i].charAt(0).toUpperCase() + words[i].slice(1);
											}

											input.value = words.join(" ");
										}}
									></input>
									<input
										id="addyTwo"
										name="addyTwo"
										placeholder="ADDRESS LINE TWO"
										className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mb-[12.5px] w-[75vw] max-w-[770px]"
										onBlur={(event) => {
											const input = event.target;
											const words = input.value.toLowerCase().split(" ");

											for (let i = 0; i < words.length; i++) {
												words[i] =
													words[i].charAt(0).toUpperCase() + words[i].slice(1);
											}

											input.value = words.join(" ");
										}}
									></input>
									<div className="mb-[63px]">
										<div className="sm:flex w-[75vw] sm:justify-center pb-[2px]">
											<input
												id="city"
												name="city"
												required
												placeholder="CITY"
												className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mr-[12.5px] mb-[12.5px] w-[75vw] sm:w-[calc(25vw-10px)] sm:max-w-[248.3333333333px]"
												onBlur={(event) => {
													const input = event.target;
													const words = input.value.toLowerCase().split(" ");

													for (let i = 0; i < words.length; i++) {
														words[i] =
															words[i].charAt(0).toUpperCase() +
															words[i].slice(1);
													}

													input.value = words.join(" ");
												}}
											></input>
											<input
												id="state"
												name="state"
												required
												placeholder="STATE"
												maxLength={2}
												className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mr-[12.5px] mb-[12.5px] w-[75vw] sm:w-[calc(25vw-10px)] sm:max-w-[248.3333333333px]"
												onKeyPress={(event) => {
													if (!/[A-Za-z]/.test(event.key)) {
														event.preventDefault();
													}
												}}
												onBlur={(event) => {
													event.target.value = event.target.value.toUpperCase();
												}}
											></input>
											<input
												id="zip"
												name="zip"
												required
												placeholder="ZIP"
												maxLength={5}
												className="infoField border-[6px] rounded-xl border-darkzestygreen text-black bg-white text-xl px-[10px] py-[7px] mb-[12.5px] w-[75vw] sm:w-[calc(25vw-10px)] sm:max-w-[248.3333333333px]"
												onKeyPress={(event) => {
													if (!/[0-9]/.test(event.key)) {
														event.preventDefault();
													}
												}}
											></input>
										</div>
										<div
											className={`flex items-center justify-center ${figtree.className}`}
										>
											<button
												className="text-3xl bg-black px-[32px] py-[15px] rounded-full text-white"
												type="submit"
											>
												PROCEED
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="block fixed bottom-0 left-0 right-0 bg-darkzestygreen">
				<ScrollLeft />
			</div>
		</div>
	);
};

export default Home;

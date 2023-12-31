// pages/index.js
"use client";
import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { Figtree } from "next/font/google";
import { useRouter } from "next/navigation";
import ScrollingBar from "./components/scrollingBar";
import ScrollLeft from "./components/scrollLeft";

const figtree = Figtree({
	weight: "900",
	subsets: ["latin"],
});

const figtreeNormal = Figtree({
	weight: "700",
	subsets: ["latin"],
});

const Home = () => {
	const [cans, setCans] = useState(0);
	const [value, setValue] = useState("5");
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(cans);
		localStorage.setItem("cans", JSON.stringify(cans));
		router.push("/shipping");
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.id) {
			case "oneCan":
				setCans(1);
				break;
			case "threeCans":
				setCans(3);
				break;
			case "customCans":
				setCans(parseInt(value));
				break;
		}
	};

	const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		let newValue = value;
		if (/^0[0-9]*$/.test(value)) {
			newValue = value.replace(/^0+/, "");
		}
		if (parseInt(newValue) < 5 || isNaN(parseInt(newValue))) {
			newValue = "5";
		} else if (parseInt(newValue) > 69) {
			newValue = "69";
		}
		setValue(newValue);
	};

	useEffect(() => {
		const container: HTMLElement | null =
			document.querySelector(".scrollContainer");
		const middleColumn: HTMLElement | null = document.querySelector(
			".rectangle-container:nth-child(2)"
		);

		if (container && middleColumn) {
			container.scrollLeft =
				middleColumn.offsetLeft -
				container.clientWidth / 2 +
				middleColumn.clientWidth / 2;
		}
	}, []);

	return (
		<div className="h-[100dvh] flex-col justify-center items-center">
			<div className="flxed bg-darkzestygreen">
				<ScrollingBar />
			</div>
			<div
				className={`h-[calc(83.333333334dvh)] md:h-[calc(100dvh-180px)] sm:h-[calc(83.333333334dvh)] md:h-[calc(100vh-180px)] ${figtree.className}`}
			>
				<div className="grad">
					<div className="sect">
						<div className="h-[calc(83.333333334dvh)] md:h-[calc(100vh-180px)] flex flex-col items-center justify-center overflow-hidden">
							<div className="flex flex-col md:flex-row items-center">
								<h1 className="reserve whitespace-nowrap">RESERVE YOUR</h1>
								<img
									className="reserveImage"
									alt="Logo Banner"
									src="logo.png"
								/>
							</div>
							<a
								className={`link text-[15px] md:text-[20px] leading-[15px] md:leading-[20px] text-center py-[5px] ${figtreeNormal.className}`}
								href="/faq"
							>
								(or click this to get some answers to your questions)
							</a>
							<form onSubmit={handleSubmit} id="form">
								<fieldset className="flex flex-col items-center">
									<div className="flex w-[100vw] sm:w-[100%] overflow-x-auto scrollContainer">
										<label htmlFor="oneCan" className="rectangle-container">
											<div className="flex items-center">
												<input
													className="radioButton"
													required
													onChange={handleRadioChange}
													type="radio"
													id="oneCan"
													name="amount"
												/>
												<label className="radioLabel" htmlFor="oneCan">
													ONE CAN
												</label>
											</div>
											<img className="cans" src="one.png" alt="one can"></img>
										</label>
										<label htmlFor="threeCans" className="rectangle-container">
											<div className="flex items-center">
												<input
													className="radioButton"
													required
													onChange={handleRadioChange}
													type="radio"
													id="threeCans"
													name="amount"
												/>
												<label className="radioLabel" htmlFor="threeCans">
													THREE CANS
												</label>
											</div>
											<img
												className="cans"
												src="three.png"
												alt="three cans"
											></img>
										</label>
										<label
											htmlFor="customCans"
											className="rectangle-container right"
										>
											<div className="flex items-center">
												<input
													className="radioButton"
													required
													onChange={handleRadioChange}
													type="radio"
													id="customCans"
													name="amount"
												/>
												<input
													className="customSelect"
													type="number"
													value={value}
													onChange={handleNumberInputChange}
													onBlur={handleBlur}
													min={5}
													max={69}
												></input>
												<label className="radioLabel" htmlFor="customCans">
													CANS
												</label>
											</div>
											<img
												className="cans"
												src="silhouette.png"
												alt="custom number"
											></img>
										</label>
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
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 left-0 right-0 bg-darkzestygreen">
				<ScrollLeft />
			</div>
		</div>
	);
};

export default Home;

import { DefaultButton, TextField, Stack, StackItem } from "@fluentui/react";
import { useState } from "react";
import { default as axios } from "axios";

function Admin(context) {
	document.getElementById("root").style.height = "100%";

	const verticalGapStackTokens = {
		childrenGap: 10,
		padding: 10,
		alignItems: "center",
	};

	const [values, setValues] = useState({
		name: "",
		email: "",
		message: "",
		selectedImage: null,
	});

	const handleChange = (event) => {
		if (event.target.name !== "selectedImage") {
			setValues({ ...values, [event.target.name]: event.target.value });
		} else {
			setValues({ ...values, [event.target.name]: event.target.files[0] });
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(values);
		const formData = new FormData();
		for (let key in values) {
			formData.append(key, values[key]);
		}
		let config = {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "multipart/form-data",
			},
		};
		// You can submit the form values to your server here
		axios
			.post("http://localhost:9000/form", formData, config)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Stack tokens={verticalGapStackTokens}>
			<StackItem>
				<TextField
					label="Title"
					styles={{ color: "white" }}
					name="title"
					onChange={handleChange}
				></TextField>
			</StackItem>
			<StackItem>
				<TextField
					label="Description"
					name="description"
					multiline
					autoAdjustHeight
					onChange={handleChange}
				/>
			</StackItem>
			<StackItem>
				{values.selectedImage && (
					<div>
						<img
							alt="not fount"
							width={"150px"}
							src={URL.createObjectURL(values.selectedImage)}
						/>
						<br />
						<button onClick={() => setValues({ selectedImage: null })}>
							Remove
						</button>
					</div>
				)}
				<br></br>
			</StackItem>

			<input type="file" name="selectedImage" onChange={handleChange} />
			<StackItem>
				<TextField
					label="Answer"
					styles={{ color: "white" }}
					name="answer"
					onChange={handleChange}
				></TextField>
			</StackItem>
			<StackItem>
				<DefaultButton
					style={{ align: "center", width: "10px" }}
					onClick={handleSubmit}
				>
					Submit
				</DefaultButton>
			</StackItem>
		</Stack>
	);
}

export default Admin;

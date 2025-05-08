import { useState, useEffect } from "react";
import { ApiResponse, InvitationFormData, InvitedVisitor } from "./types";

export const useGuestsPage = () => {
	// Состояния для данных
	const [invitations, setInvitations] = useState<InvitedVisitor[]>([]);
	const [myInvitations, setMyInvitations] = useState<InvitedVisitor[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [error, setError] = useState<string | null>(null);

	// Состояния для модального окна создания приглашения
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [formData, setFormData] = useState<InvitationFormData>({
		firstName: "",
		lastName: "",
		surname: "",
		email: "",
		validFrom: new Date(),
		validTo: new Date(new Date().setDate(new Date().getDate() + 7)), // По умолчанию на неделю
	});

	// Загрузка всех приглашений
	useEffect(() => {
		const fetchInvitations = async () => {
			setIsLoading(true);
			try {
				const queryParams = searchQuery
					? `?filters[visitor_data][firstName][$contains]=${searchQuery}`
					: "";
				const response = await fetch(
					`http://localhost:1337/api/invitation-links${queryParams}`
				);

				if (!response.ok) {
					throw new Error("Ошибка при загрузке приглашений");
				}

				const result = (await response.json()) as ApiResponse;
				setInvitations(result.data);
			} catch (error) {
				console.error("Ошибка при загрузке приглашений:", error);
				setError("Не удалось загрузить приглашения");
			} finally {
				setIsLoading(false);
			}
		};

		fetchInvitations();
	}, [searchQuery]);

	// Загрузка моих приглашений
	useEffect(() => {
		const fetchMyInvitations = async () => {
			try {
				const response = await fetch(
					"http://localhost:1337/api/my-invitation-links"
				);

				if (!response.ok) {
					throw new Error("Ошибка при загрузке моих приглашений");
				}

				const result = (await response.json()) as ApiResponse;
				setMyInvitations(result.data);
			} catch (error) {
				console.error("Ошибка при загрузке моих приглашений:", error);
				setError("Не удалось загрузить ваши приглашения");
			}
		};

		fetchMyInvitations();
	}, []);

	// Обработчик создания нового приглашения
	const handleCreateInvitation = async () => {
		try {
			setError(null);

			// Проверка обязательных полей
			if (
				!formData.firstName ||
				!formData.surname ||
				!formData.email ||
				!formData.validFrom ||
				!formData.validTo
			) {
				setError("Пожалуйста, заполните все обязательные поля");
				return;
			}

			const response = await fetch(
				"http://localhost:1337/api/invitation-links",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						data: {
							visitor_data: {
								firstName: formData.firstName,
								lastName: formData.lastName,
								surname: formData.surname,
								email: formData.email,
								persone_roles: formData.persone_roles || [],
							},
							validFrom: formData.validFrom.toISOString(),
							validTo: formData.validTo.toISOString(),
						},
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error?.message ||
						"Ошибка при создании приглашения"
				);
			}

			// Обновляем списки приглашений
			await Promise.all([
				fetch(`http://localhost:1337/api/invitation-links`).then(
					(res) => res.json()
				),
				fetch("http://localhost:1337/api/my-invitation-links").then(
					(res) => res.json()
				),
			]).then(([allInvitations, myInvitations]) => {
				setInvitations(allInvitations.data);
				setMyInvitations(myInvitations.data);
			});

			setIsCreateModalOpen(false);

			// Сбрасываем форму
			setFormData({
				firstName: "",
				lastName: "",
				surname: "",
				email: "",
				validFrom: new Date(),
				validTo: new Date(new Date().setDate(new Date().getDate() + 7)),
			});
		} catch (error) {
			console.error("Ошибка при создании приглашения:", error);
			setError(
				error instanceof Error
					? error.message
					: "Ошибка при создании приглашения"
			);
		}
	};

	// Обработчик удаления приглашения
	const handleDeleteInvitation = async (id: number) => {
		try {
			const response = await fetch(
				`http://localhost:1337/api/invitation-links/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Ошибка при удалении приглашения");
			}

			// Удаляем приглашение из списков
			setInvitations((prev) => prev.filter((inv) => inv.id !== id));
			setMyInvitations((prev) => prev.filter((inv) => inv.id !== id));
		} catch (error) {
			console.error("Ошибка при удалении приглашения:", error);
			setError("Не удалось удалить приглашение");
		}
	};

	// Обработчик обновления статуса приглашения
	const handleUpdateStatus = async (id: number, status: string) => {
		try {
			const response = await fetch(
				`http://localhost:1337/api/invitation-links/${id}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						status: status,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Ошибка при обновлении статуса");
			}

			const updatedInvitation = await response.json();

			// Обновляем приглашение в списках
			setInvitations((prev) =>
				prev.map((inv) =>
					inv.id === id ? updatedInvitation.data : inv
				)
			);
			setMyInvitations((prev) =>
				prev.map((inv) =>
					inv.id === id ? updatedInvitation.data : inv
				)
			);
		} catch (error) {
			console.error("Ошибка при обновлении статуса:", error);
			setError("Не удалось обновить статус приглашения");
		}
	};

	return {
		invitations,
		myInvitations,
		isLoading,
		searchQuery,
		setSearchQuery,
		error,
		isCreateModalOpen,
		setIsCreateModalOpen,
		formData,
		setFormData,
		handleCreateInvitation,
		handleDeleteInvitation,
		handleUpdateStatus,
	};
};

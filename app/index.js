// app/index.js
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    TextInput,
    FlatList,
    Alert,
    StyleSheet,
} from "react-native";
import ContactItem from "../components/ContactItem.js";
import { Avatar } from "react-native-paper";

export default function HomeScreen() {
    const [contacts, setContacts] = useState([]); // Lista de contatos
    const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
    const [newContact, setNewContact] = useState({
        name: "",
        phone: "",
        category: "pessoal" // valor padrão
    });
    const [editIndex, setEditIndex] = useState(null); // Índice do contato em edição

    // Função para adicionar ou editar contato
    function addOrEditContact() {
        if (!newContact.name || !newContact.phone) {
            Alert.alert("Erro", "Nome e telefone são obrigatórios");
            return;
        }

        const updatedContacts = [...contacts]; // Cria uma cópia do array para modificar

        if (editIndex === null) {
            // Adiciona um novo contato
            updatedContacts.push(newContact);
        } else {
            // Edita um contato existente
            updatedContacts[editIndex] = newContact;
            setEditIndex(null);
        }

        setContacts(updatedContacts);
        setNewContact({ name: "", phone: "", category: "pessoal" });
        setModalVisible(false);
    }

    // Função para confirmar exclusão de contato
    function confirmDelete(index) {
        Alert.alert(
            "Excluir contato?",
            `Remover "${contacts[index].name}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        const updatedContacts = [...contacts];
                        updatedContacts.splice(index, 1);
                        setContacts(updatedContacts);
                    },
                },
            ]
        );
    }

    // Função para abrir o modal em modo de edição
    function openEditModal(index) {
        setNewContact({ ...contacts[index] });
        setEditIndex(index);
        setModalVisible(true);
    }

    // Função para obter a cor da categoria
    function getCategoryColor(category) {
        switch (category) {
            case "Trabalho": return "#3C153B"; // Cor principal
            case "Família": return "#7D4D7D"; // Versão mais clara da cor principal
            case "Pessoal": return "#F0C987"; // Cor secundária
            default: return "#9e9e9e"; // Cinza
        }
    }

    // Função para obter a inicial do nome do contato
    function getInitial(name) {
        return name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";
    }

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal */}
            <Pressable
                onPress={() => {
                    setNewContact({ name: "", phone: "", category: "pessoal" });
                    setEditIndex(null);
                    setModalVisible(true);
                }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋ Novo Contato</Text>
            </Pressable>

            {/* Lista de contatos */}
            <FlatList
                data={contacts}
                keyExtractor={(_, i) => String(i)}
                renderItem={({ item, index }) => (
                    <ContactItem
                        contact={item}
                        onEdit={() => openEditModal(index)}
                        onDelete={() => confirmDelete(index)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum contato adicionado!</Text>
                }
            />

            {/* Modal para adicionar ou editar contato */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editIndex === null ? "Adicionar Contato" : "Editar Contato"}
                        </Text>

                        <Text style={styles.inputLabel}>Nome:</Text>
                        <TextInput
                            value={newContact.name}
                            onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                            placeholder="Ex: João Silva"
                            style={styles.input}
                        />

                        <Text style={styles.inputLabel}>Telefone:</Text>
                        <TextInput
                            value={newContact.phone}
                            onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                            placeholder="Ex: (11) 98765-4321"
                            keyboardType="phone-pad"
                            style={styles.input}
                        />

                        <Text style={styles.inputLabel}>Categoria:</Text>
                        <View style={styles.categorySelector}>
                            {[
                                { name: "Pessoal", label: "Pessoal", color: "#F0C987" },
                                { name: "Trabalho", label: "Trabalho", color: "#3C153B" },
                                { name: "Família", label: "Família", color: "#7D4D7D" }
                            ].map((category) => (
                                <Pressable
                                    key={category.name}
                                    style={[
                                        styles.categoryOption,
                                        {
                                            backgroundColor: category.color,
                                            borderWidth: newContact.category === category.name ? 3 : 0,
                                            borderColor: "#000",
                                            opacity: newContact.category === category.name ? 1 : 0.7
                                        }
                                    ]}
                                    onPress={() => setNewContact({ ...newContact, category: category.name })}
                                >
                                    <Text
                                        style={[
                                            styles.categoryOptionText,
                                            {
                                                color: category.color === "#F0C987" ? "#333" : "#fff",
                                                fontWeight: newContact.category === category.name ? "bold" : "normal"
                                            }
                                        ]}
                                    >
                                        {category.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable onPress={addOrEditContact} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>
                                    {editIndex === null ? "Adicionar" : "Salvar alterações"}
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>
                                    Cancelar
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    addButton: {
        marginBottom: 16,
        alignSelf: "center",
        backgroundColor: "#3C153B",
        padding: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#F0C987",
        fontSize: 16,
        fontWeight: "bold",
    },
    contactItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
    },
    avatar: {
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#3C153B",
    },
    contactPhone: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    categoryBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    categoryText: {
        color: "#fff",
        fontSize: 12,
    },
    contactButtons: {
        flexDirection: "row",
    },
    contactButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 6,
    },
    editButton: {
        backgroundColor: "#F0C987",
    },
    deleteButton: {
        backgroundColor: "#3C153B",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        color: "#666",
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#3C153B",
    },
    inputLabel: {
        marginBottom: 4,
        fontWeight: "500",
        color: "#3C153B",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
        backgroundColor: "#fafafa",
    },
    categorySelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    categoryOption: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 4,
        alignItems: "center",
    },
    categoryOptionText: {
        fontWeight: "500",
    },
    modalButtons: {
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: "#3C153B",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 8,
    },
    saveButtonText: {
        color: "#F0C987",
        fontWeight: "bold",
    },
    cancelButton: {
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#666",
    },
});
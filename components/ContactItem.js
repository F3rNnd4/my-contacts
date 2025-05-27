import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const ContactItem = ({ contact, onEdit, onDelete }) => {
    // Função para obter a inicial do nome do contato
    const getInitial = (name) => {
        return name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";
    };

    // Função para obter a cor da categoria
    const getCategoryColor = (category) => {
        switch (category) {
            case "trabalho": return "#3C153B";
            case "família": return "#7D4D7D";
            case "pessoal": return "#F0C987";
            default: return "#9e9e9e";
        }
    };

    // Função para obter o ícone da categoria
    const getCategoryIcon = (category) => {
        switch (category) {
            case "Trabalho": return "💼";
            case "Família": return "👪";
            case "Pessoal": return "👤";
            default: return "📋";
        }
    };

    return (
        <View style={styles.contactCard}>
            <View style={styles.contactHeader}>
                <View style={styles.avatarContainer}>
                    <Avatar.Text
                        size={56}
                        label={getInitial(contact.name)}
                        color="#F0C987"
                        backgroundColor="#3C153B"
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>

                    <View style={styles.categoryContainer}>
                        <View style={[
                            styles.categoryBadge,
                            { backgroundColor: getCategoryColor(contact.category) }
                        ]}>
                            <Text style={styles.categoryIcon}>
                                {getCategoryIcon(contact.category)}
                            </Text>
                            <Text style={[
                                styles.categoryText,
                                { color: contact.category === "pessoal" ? "#333" : "#fff" }
                            ]}>
                                {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contactButtons}>
                    <Pressable
                        onPress={onEdit}
                        style={[styles.contactButton, styles.editButton]}
                    >
                        <Text style={styles.buttonText}>✏️</Text>
                    </Pressable>
                    <Pressable
                        onPress={onDelete}
                        style={[styles.contactButton, styles.deleteButton]}
                    >
                        <Text style={styles.buttonText}>🗑️</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    contactHeader: {
        flexDirection: "row",
        padding: 14,
        alignItems: "center",
    },
    avatarContainer: {
        marginRight: 14,
    },
    avatar: {
        elevation: 3,
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
        marginBottom: 6,
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    categoryIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: "600",
    },
    contactButtons: {
        flexDirection: "column",
        justifyContent: 'space-between',
        height: 76,
    },
    contactButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },
    editButton: {
        backgroundColor: "#F0C987",
    },
    deleteButton: {
        backgroundColor: "#3C153B",
    },
    buttonText: {
        fontSize: 14,
    },
});

export default ContactItem;
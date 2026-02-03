import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';

const MyStocksScreen = () => {
    const [stocks, setStocks] = useState([
        { id: '1', cropName: 'Wheat', quantity: 50, unit: 'quintal', purchasePrice: 2100, purchaseDate: '2024-01-15' },
        { id: '2', cropName: 'Rice', quantity: 30, unit: 'quintal', purchasePrice: 2800, purchaseDate: '2024-01-20' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newStock, setNewStock] = useState({
        cropName: '',
        quantity: '',
        purchasePrice: '',
    });

    const totalValue = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.purchasePrice), 0);

    const handleAddStock = () => {
        if (!newStock.cropName || !newStock.quantity || !newStock.purchasePrice) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const stock = {
            id: Date.now().toString(),
            cropName: newStock.cropName,
            quantity: parseFloat(newStock.quantity),
            unit: 'quintal',
            purchasePrice: parseFloat(newStock.purchasePrice),
            purchaseDate: new Date().toISOString().split('T')[0],
        };

        setStocks([...stocks, stock]);
        setNewStock({ cropName: '', quantity: '', purchasePrice: '' });
        setModalVisible(false);
        Alert.alert('Success', 'Stock added successfully');
    };

    const StockCard = ({ item }) => {
        const value = item.quantity * item.purchasePrice;
        return (
            <View style={commonStyles.card}>
                <View style={styles.stockHeader}>
                    <Text style={styles.cropName}>{item.cropName}</Text>
                    <Text style={styles.stockValue}>₹{value.toLocaleString()}</Text>
                </View>
                <View style={styles.stockDetails}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Quantity</Text>
                        <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Purchase Price</Text>
                        <Text style={styles.detailValue}>₹{item.purchasePrice}/{item.unit}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Purchase Date</Text>
                        <Text style={styles.detailValue}>{item.purchaseDate}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={commonStyles.container}>
            {/* Summary Card */}
            <View style={[commonStyles.card, styles.summaryCard]}>
                <Text style={styles.summaryLabel}>Total Inventory Value</Text>
                <Text style={styles.summaryValue}>₹{totalValue.toLocaleString()}</Text>
                <Text style={styles.summarySubtext}>{stocks.length} items in stock</Text>
            </View>

            {/* Add Stock Button */}
            <TouchableOpacity
                style={[commonStyles.button, styles.addButton]}
                onPress={() => setModalVisible(true)}>
                <MaterialIcons name="add" size={20} color={colors.white} />
                <Text style={[commonStyles.buttonText, { marginLeft: 8 }]}>Add New Stock</Text>
            </TouchableOpacity>

            {/* Stocks List */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>My Stocks</Text>
                {stocks.map((item) => (
                    <StockCard key={item.id} item={item} />
                ))}
            </ScrollView>

            {/* Add Stock Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Stock</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={commonStyles.inputLabel}>Crop Name</Text>
                        <TextInput
                            style={commonStyles.input}
                            placeholder="e.g., Wheat"
                            value={newStock.cropName}
                            onChangeText={(text) => setNewStock({ ...newStock, cropName: text })}
                        />

                        <Text style={commonStyles.inputLabel}>Quantity (quintal)</Text>
                        <TextInput
                            style={commonStyles.input}
                            placeholder="e.g., 50"
                            keyboardType="decimal-pad"
                            value={newStock.quantity}
                            onChangeText={(text) => setNewStock({ ...newStock, quantity: text })}
                        />

                        <Text style={commonStyles.inputLabel}>Purchase Price (per quintal)</Text>
                        <TextInput
                            style={commonStyles.input}
                            placeholder="e.g., 2100"
                            keyboardType="decimal-pad"
                            value={newStock.purchasePrice}
                            onChangeText={(text) => setNewStock({ ...newStock, purchasePrice: text })}
                        />

                        <TouchableOpacity style={commonStyles.button} onPress={handleAddStock}>
                            <Text style={commonStyles.buttonText}>Add Stock</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryCard: {
        margin: 16,
        backgroundColor: colors.primary,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 14,
        color: colors.white,
        opacity: 0.9,
        marginBottom: 8,
    },
    summaryValue: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    summarySubtext: {
        fontSize: 14,
        color: colors.white,
        opacity: 0.8,
    },
    addButton: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    content: {
        padding: 16,
        paddingTop: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 12,
    },
    stockHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cropName: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    stockValue: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.primary,
    },
    stockDetails: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.textPrimary,
    },
});

export default MyStocksScreen;

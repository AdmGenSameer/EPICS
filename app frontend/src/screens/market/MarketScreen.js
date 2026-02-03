import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';

const MarketScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('prices');

    const mandiPrices = [
        { id: '1', mandiName: 'Azadpur Mandi', location: 'Delhi', cropName: 'Wheat', price: 2150, unit: 'quintal', isBestPrice: true },
        { id: '2', mandiName: 'Khari Baoli', location: 'Delhi', cropName: 'Wheat', price: 2100, unit: 'quintal' },
        { id: '3', mandiName: 'Najafgarh Mandi', location: 'Delhi', cropName: 'Rice', price: 2850, unit: 'quintal', isBestPrice: true },
        { id: '4', mandiName: 'Ghazipur Mandi', location: 'Delhi', cropName: 'Rice', price: 2800, unit: 'quintal' },
        { id: '5', mandiName: 'Azadpur Mandi', location: 'Delhi', cropName: 'Potato', price: 1200, unit: 'quintal' },
        { id: '6', mandiName: 'Khari Baoli', location: 'Delhi', cropName: 'Tomato', price: 1800, unit: 'quintal', isBestPrice: true },
    ];

    const filteredPrices = mandiPrices.filter(item =>
        item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mandiName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const PriceCard = ({ item }) => (
        <View style={commonStyles.card}>
            <View style={styles.priceHeader}>
                <View style={styles.priceInfo}>
                    <Text style={styles.cropName}>{item.cropName}</Text>
                    <View style={styles.locationRow}>
                        <MaterialIcons name="location-on" size={14} color={colors.textSecondary} />
                        <Text style={styles.locationText}>{item.mandiName}, {item.location}</Text>
                    </View>
                </View>
                {item.isBestPrice && (
                    <View style={styles.bestPriceBadge}>
                        <Text style={styles.bestPriceText}>Best Price</Text>
                    </View>
                )}
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.priceAmount}>₹{item.price}</Text>
                <Text style={styles.priceUnit}>per {item.unit}</Text>
            </View>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color={colors.gray500} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search crops or mandis..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'prices' && styles.activeTab]}
                    onPress={() => setActiveTab('prices')}>
                    <Text style={[styles.tabText, activeTab === 'prices' && styles.activeTabText]}>
                        Prices
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'prediction' && styles.activeTab]}
                    onPress={() => {
                        setActiveTab('prediction');
                        navigation.navigate('PricePrediction', { cropName: 'Wheat' });
                    }}>
                    <Text style={[styles.tabText, activeTab === 'prediction' && styles.activeTabText]}>
                        Prediction
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'stocks' && styles.activeTab]}
                    onPress={() => {
                        setActiveTab('stocks');
                        navigation.navigate('MyStocks');
                    }}>
                    <Text style={[styles.tabText, activeTab === 'stocks' && styles.activeTabText]}>
                        My Stocks
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Prices List */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>
                    {searchQuery ? 'Search Results' : 'Today\'s Mandi Prices'}
                </Text>
                {filteredPrices.map((item) => (
                    <PriceCard key={item.id} item={item} />
                ))}
                {filteredPrices.length === 0 && (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="search-off" size={60} color={colors.gray400} />
                        <Text style={styles.emptyText}>No results found</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: colors.textPrimary,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    activeTabText: {
        color: colors.white,
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
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    priceInfo: {
        flex: 1,
    },
    cropName: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    bestPriceBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bestPriceText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.white,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceAmount: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.primary,
        marginRight: 8,
    },
    priceUnit: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 16,
    },
});

export default MarketScreen;

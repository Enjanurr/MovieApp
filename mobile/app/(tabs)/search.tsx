import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

   // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();

        // Call updateSearchCount only if there are results
      /*  if (movies?.length! > 0 && movies?.[0]) {
            await updateSearchCount(searchQuery, movies[0]);
        } 
        */
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        data={movies || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* App Logo */}
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            {/* Search Bar */}
            <View className='my-5'>
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Always show “Search Results for …” if there’s text */}
            {searchQuery.trim().length > 0 && (
              <Text className="text-xl text-white text-center font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}

            {/* Loading Spinner */}
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3' />
            )}

            {/* Error Message */}
            {moviesError && (
              <Text className='text-red-500 px-5 my-3 text-center'>
                Error: {moviesError.message}
              </Text>
            )}

            {/* No Results */}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length === 0 && (
                <Text className='text-white text-center mt-4'>
                  No movies found for "{searchQuery}"
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
         !moviesLoading && !moviesError ? (
          <View className="mt-10 px-5">
            <Text className = "text-center text-gray-500">
              {searchQuery.trim() ? "No movies Found" : "Search for a movie"}
            </Text>
          </View>
         ):null
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});

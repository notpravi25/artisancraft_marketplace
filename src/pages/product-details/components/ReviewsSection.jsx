import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const reviewsPerPage = 5;

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
  ];

  const ratingFilters = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' },
  ];

  const filteredAndSortedReviews = reviews?.filter(review => filterRating === 'all' || review?.rating?.toString() === filterRating)?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b?.rating - a?.rating;
        case 'lowest':
          return a?.rating - b?.rating;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedReviews?.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredAndSortedReviews?.slice(startIndex, startIndex + reviewsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Customer Reviews
        </h2>
        <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
          Write Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="bg-card rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-heading font-bold text-foreground">
                {averageRating?.toFixed(1)}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    color={i < Math.floor(averageRating) ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                    className={i < Math.floor(averageRating) ? "fill-current" : ""}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${totalReviews > 0 ? (ratingDistribution?.[rating] / totalReviews) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {ratingFilters?.map((filter) => (
              <option key={filter?.value} value={filter?.value}>
                {filter?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {currentReviews?.map((review) => (
          <div key={review?.id} className="bg-card rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  {review?.avatar ? (
                    <Image
                      src={review?.avatar}
                      alt={review?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={16} color="var(--color-secondary-foreground)" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{review?.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          color={i < review?.rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                          className={i < review?.rating ? "fill-current" : ""}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
              {review?.verified && (
                <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                  Verified Purchase
                </span>
              )}
            </div>

            <p className="text-foreground leading-relaxed">{review?.comment}</p>

            {review?.images && review?.images?.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {review?.images?.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
                <Icon name="ThumbsUp" size={14} />
                <span>Helpful ({review?.helpfulCount})</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
                <Icon name="MessageCircle" size={14} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)]?.map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-smooth ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <span key={page} className="text-muted-foreground">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
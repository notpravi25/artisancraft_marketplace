import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSteps = ({ currentStep, completedSteps }) => {
  const steps = [
    {
      id: 1,
      title: 'Upload Images',
      description: 'Add photos of your craft',
      icon: 'Upload'
    },
    {
      id: 2,
      title: 'Set Price',
      description: 'Price your product',
      icon: 'IndianRupee'
    },
    {
      id: 3,
      title: 'AI Description',
      description: 'Generate product story',
      icon: 'Sparkles'
    },
    {
      id: 4,
      title: 'Review & Publish',
      description: 'Final review and publish',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'active':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    const isCompleted = completedSteps?.includes(stepId) || stepId < currentStep;
    return isCompleted ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full">
      {/* Desktop Progress */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            return (
              <React.Fragment key={step?.id}>
                <div className="flex flex-col items-center space-y-2 flex-1">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${status === 'active' ? 'text-primary' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}`}>
                      {step?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step?.description}
                    </p>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 transition-all duration-300" style={{ backgroundColor: getConnectorClasses(step?.id) === 'bg-success' ? 'var(--color-success)' : 'var(--color-border)' }}>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Mobile Progress */}
      <div className="lg:hidden">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            return (
              <React.Fragment key={step?.id}>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${status === 'active' ? 'text-primary' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}`}>
                      {step?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step?.description}
                    </p>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={status === 'completed' ? 'text-success' : 'text-muted-foreground'} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps?.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps?.length / steps?.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-foreground">
              {Math.round((completedSteps?.length / steps?.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
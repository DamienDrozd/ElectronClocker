#!/bin/bash
#!/bin/bash

# Check if lm-sensors is already installed
if ! command -v sensors &> /dev/null
then
    # Install lm-sensors
    echo "Installing lm-sensors..."
    sudo apt-get update
    sudo apt-get install -y lm-sensors

    # Detect hardware sensors
    echo "Detecting hardware sensors..."
    sudo sensors-detect --auto

    # Print the CPU temperature to test if lm-sensors is working
    echo "CPU temperature:"
    sensors | grep -A 0 'Core 0' | awk '{print $3}'

    echo "lm-sensors installation complete."
else
    echo "lm-sensors is already installed."
fi


# Vérifie si cpupower est déjà installé
if ! command -v cpupower &> /dev/null
then
    # Installation de cpupower
    echo "Installation de cpupower..."
    sudo apt-get install -y cpupower

    echo "Installation de cpupower terminée."
else
    echo "cpupower est déjà installé."
fi